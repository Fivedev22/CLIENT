import { OnInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from './services/client.service';
import { IClient } from './services/interfaces/client.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  title = 'frontend';

  displayedColumns: string[] = ['name', 'last_name', 'document', 'email', 'is_foreign', 'province', 'actions'];

  dataSource!: MatTableDataSource<IClient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private readonly dialog: MatDialog,
    private readonly clientService: ClientService
  ) { }


  ngOnInit(): void {
    this.findAllClient();
  }

  findAllClient() {
    this.clientService.findAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteClient(id: number, name: string, last_name: string) {
    Swal.fire({
      title: '¿Desea eliminar el cliente?',
      text: `${name} ${last_name}`,
      icon: 'error',
      showCancelButton: true,

      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',

    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.remove(+id)
          .subscribe({
            next: (res) => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Cliente eliminado correctamente',
                showConfirmButton: false,
                timer: 1800
              }).then(() => {
                this.findAllClient();
              })
            },
            error(e) {
              alert(e)
            },
          })
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  openFormCreateClient() {
    this.dialog.open(DialogComponent, { width: '800px', disableClose: true }).afterClosed()
      .subscribe(val => {
        if (val === 'save') {
          this.findAllClient();
        }
      });
  }

  openFormEditClient(row: IClient) {
    this.dialog.open(DialogComponent, { width: '800px', data: row, disableClose: true }).afterClosed()
      .subscribe(val => {
        if (val === 'update') {
          this.findAllClient();
        }
      });
  }


}
