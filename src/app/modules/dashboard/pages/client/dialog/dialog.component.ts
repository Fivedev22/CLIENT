import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { ClientService } from '../services/client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IProvince } from '../../../services/interfaces/province.interface';
import { IGenderType } from '../../../services/interfaces/gender-type.interface';
import { IDocumentType } from '../../../services/interfaces/document-type.interface';
import { ProvinceService } from '../../../services/province.service';
import { DocumentTypeService } from '../../../services/document-type.service';
import { GenderTypeService } from '../../../services/gender-type.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  provinces!: IProvince[];
  genderTypes!: IGenderType[];
  documentTypes!: IDocumentType[];

  clientForm!: FormGroup;

  foreignOptions = [
    { id: true, name: 'Si' },
    { id: false, name: 'No' },
  ]

  actionTitle: string = 'Registrar Cliente'
  actionButton: string = 'Registrar';

  @ViewChild('createAlert') createAlert!: SwalComponent;
  @ViewChild('updateAlert') updateAlert!: SwalComponent;
  @ViewChild('errorAlert') errorAlert!: SwalComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) private clientData: any,

    private formBuilder: FormBuilder,

    private provinceService: ProvinceService,
    private documentTypeService: DocumentTypeService,
    private genderTypeService: GenderTypeService,
    private clientService: ClientService,

    public dialogRef: MatDialogRef<DialogComponent>
  ) { }

  ngOnInit(): void {
    this.clientForm = this.initForm();
    this.findAllProvince();
    this.findAllDocumentType();
    this.findAllGenderType();

    if (this.clientData) {
      this.addClientData(this.clientData);
    }
  }

  changeStateProvince() {
    if (this.clientForm.controls['is_foreign'].value) {
      this.clientForm.controls['province'].disable();
      this.clientForm.controls['province'].reset();
    }
    else {
      this.clientForm.controls['province'].enable();
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.clientForm.controls[controlName].hasError(errorName);
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z\u00E0-\u00FC\u00f1\u00d1]*"), Validators.minLength(3), Validators.maxLength(20)]],
      last_name: ['', [Validators.required, Validators.pattern("[a-zA-Z\u00E0-\u00FC\u00f1\u00d1]*"), Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern("[0-9]*"), Validators.minLength(10), Validators.maxLength(20)]],
      gender_type: ['', [Validators.required]],
      document_type: ['', [Validators.required]],
      document: ['', [Validators.required, Validators.pattern("[A-Z0-9]*"), Validators.minLength(8), Validators.maxLength(20)]],
      is_foreign: ['', [Validators.required]],
      province: ['', [Validators.required]]
    });
  }

  addClientData(data: any) {
    this.actionTitle = 'Modificar Cliente'
    this.actionButton = 'Actualizar'
    this.clientForm.controls['name'].setValue(data.name);
    this.clientForm.controls['last_name'].setValue(data.last_name);
    this.clientForm.controls['email'].setValue(data.email);
    this.clientForm.controls['phone_number'].setValue(data.phone_number);
    this.clientForm.controls['gender_type'].setValue(data.gender_type.id_gender_type);
    this.clientForm.controls['document_type'].setValue(data.document_type.id_document_type);
    this.clientForm.controls['document'].setValue(data.document);
    this.clientForm.controls['is_foreign'].setValue(data.is_foreign);
    data.is_foreign ? this.clientForm.controls['province'].setValue(null) : this.clientForm.controls['province'].setValue(data.province.id_province);
  }

  sendClient() {
    if (!this.clientData) this.createClient();
    else this.updateClient();
  }

  createClient() {
    if (this.clientForm.valid) {
      this.clientService.create(this.clientForm.value).subscribe({
        next: (res) => {
          this.createAlert.fire()
            .then(() => {
              this.clientForm.reset();
              this.dialogRef.close('save');
            });
        },
        error: (e) => {
          this.errorAlert.fire();
        }
      })
    }
  }

  updateClient() {
    if (this.clientForm.valid) {
      this.clientService.update(+this.clientData.id_client, this.clientForm.value).subscribe({
        next: (res) => {
          this.updateAlert.fire()
            .then(() => {
              this.clientForm.reset();
              this.dialogRef.close('update');
            });
        },
        error: (e) => {
          this.errorAlert.fire();
        }
      })
    }
  }

  findAllProvince() {
    this.provinceService.findAll().subscribe(data => {
      this.provinces = data;
    });
  }

  findAllGenderType() {
    this.genderTypeService.findAll().subscribe(data => {
      this.genderTypes = data;
    });
  }

  findAllDocumentType() {
    this.documentTypeService.findAll().subscribe(data => {
      this.documentTypes = data;
    })
  }
}
