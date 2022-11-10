import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { IRegisterUser } from '../../models/register-user';
import { DashboardService } from '../../services/dashboard.service';

interface IClient {
  nombre?: string;
  apellido?: string;
  documento?: string;
  extranjero?: string;
  provincia?: string;
  email?: string;
  telefono?: string;
}

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  public formularioRegCliente!: FormGroup;

  dataSource: MatTableDataSource<IClient>;
  clients: IClient[];

  columns: string[] = [
    'Nombre',
    'Apellido',
    'Documento',
    'Extranjero',
    'Provincia',
    'Email',
    'Telefono',
    'Acciones',
  ];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('secondDialog') secondDialog!: TemplateRef<any>;

  constructor(
    public matDialog: MatDialog,
    public formBuilder: FormBuilder,
    public dashboardService: DashboardService
  ) {
    this.clients = [
      {
        nombre: 'Juan',
        apellido: 'Calero',
        documento: '43231250',
        extranjero: 'No',
        provincia: 'Córdoba',
        email: 'marcelocalero5@gmail.com',
        telefono: '3516538808',
      },
      {
        nombre: 'Nicolas',
        apellido: 'Zalazar',
        documento: '43231251',
        extranjero: 'No',
        provincia: 'Córdoba',
        email: 'nicolaszalazar@gmail.com',
        telefono: '3516538809',
      },
    ];

    this.dataSource = new MatTableDataSource(this.clients);
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página';
    this.formularioRegCliente = this.initForm();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openalert() {
    Swal.fire({
      title: 'هل تريد الاستمرار؟',
      icon: 'question',
      iconHtml: '؟',
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
      showCancelButton: true,
      showCloseButton: true,
    });
  }
  openDialogWithoutRef() {
    this.matDialog.open(this.secondDialog, { width: '800px' });
  }

  regCliente() {
    const datosUsuario = new IRegisterUser(
      this.formularioRegCliente.get('nombre')?.value,
      this.formularioRegCliente.get('apellido')?.value,
      this.formularioRegCliente.get('email')?.value,
      this.formularioRegCliente.get('telefono')?.value,
      this.formularioRegCliente.get('documento')?.value,
      this.formularioRegCliente.get('extranjero')?.value,
      this.formularioRegCliente.get('provincia')?.value,
      this.formularioRegCliente.get('genero')?.value,
      this.formularioRegCliente.get('tipoDocumento')?.value
    );

    console.log(datosUsuario);

    this.dashboardService.registerClient(datosUsuario).subscribe(
      (data) =>{
        console.log(data)
      }, 
      (error) => {

      }
    )
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      apellido: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
      ],
      telefono: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(100),
        ],
      ],
      documento: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(100),
        ],
      ],
      extranjero: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      provincia: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],

      genero: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      tipoDocumento: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
    });
  }
}
