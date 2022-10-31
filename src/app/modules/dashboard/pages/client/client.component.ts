import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2'

interface IClient {
  nombre?: string,
  apellido?: string,
  documento?: string,
  extranjero?: string,
  provincia?: string,
  email?: string,
  telefono?: string,
}


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  dataSource: MatTableDataSource<IClient>;
  clients: IClient[];

  columns: string[] = ['Nombre', 'Apellido', 'Documento', 'Extranjero', 'Provincia', 'Email', 'Telefono', 'Acciones'];

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild('secondDialog') secondDialog!: TemplateRef<any>;

  constructor(public matDialog: MatDialog) {
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
    ]

    this.dataSource = new MatTableDataSource(this.clients);
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Elementos por página'
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
      showCloseButton: true
    })
  }
  openDialogWithoutRef() {
    this.matDialog.open(this.secondDialog, { width: '500px' });
  }

}
