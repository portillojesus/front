import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scheduling',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css']
})
export class SchedulingComponent {
  scheduleForm: FormGroup;
  appointments: Array<any> = [];
  providers: Array<{ id: number, name: string }> = [];
  cages: Array<{ id: number, name: string }> = [];
  products: Array<{ id: number, name: string }> = [];
  predefinedTimes = ['07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'];

  editMode: boolean = false;
  selectedAppointmentId: number | null = null;

  constructor(private fb: FormBuilder) {
    this.scheduleForm = this.fb.group({
      idTurno: [null],
      fecha: ['', Validators.required],
      horaInicioAgendamiento: ['', Validators.required],
      horaFinAgendamiento: ['', Validators.required],
      idProveedor: ['', Validators.required],
      idJaula: ['', Validators.required],
      detalle: this.fb.array([])
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined' && localStorage) {
      const savedProviders = localStorage.getItem('providers');
      if (savedProviders) {
        this.providers = JSON.parse(savedProviders);
      }

      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        this.products = JSON.parse(savedProducts);
      }

      const savedCages = localStorage.getItem('cages');
      if (savedCages) {
        this.cages = JSON.parse(savedCages);
      }

      const savedAppointments = localStorage.getItem('appointments');
      if (savedAppointments) {
        this.appointments = JSON.parse(savedAppointments);
      }
    }
  }

  // Get the product name by its ID
  getProductNameById(id: number | string): string {
    console.log('ID to search:', id, 'Available products:', this.products);  // Log product details
    const product = this.products.find(p => p.id === +id);  // Ensure correct comparison
    return product ? product.name : 'Unknown Product';
  }

  // Add a new product entry to the form array (detalle)
  addProduct(): void {
    const detalleArray = this.scheduleForm.get('detalle') as FormArray;
    detalleArray.push(this.fb.group({
      idProducto: ['', Validators.required],
      cantidad: [0, Validators.required]
    }));
  }

  // Submit the form
  onSubmit(): void {
    if (this.scheduleForm.valid) {
      if (this.editMode) {
        const index = this.appointments.findIndex(a => a.idTurno === this.selectedAppointmentId);
        if (index !== -1) {
          this.appointments[index] = {
            idTurno: this.selectedAppointmentId,
            ...this.scheduleForm.value
          };
          localStorage.setItem('appointments', JSON.stringify(this.appointments));
          this.editMode = false;
          this.selectedAppointmentId = null;
        }
      } else {
        const newAppointment = {
          idTurno: this.appointments.length + 1,
          ...this.scheduleForm.value
        };
        this.appointments.push(newAppointment);
        localStorage.setItem('appointments', JSON.stringify(this.appointments));
      }
      this.scheduleForm.reset();
    }
  }

  // Get form array controls
  get detalleControls() {
    return (this.scheduleForm.get('detalle') as FormArray).controls;
  }

  // Edit an appointment
  onEdit(appointment: any): void {
    this.editMode = true;
    this.selectedAppointmentId = appointment.idTurno;
    this.scheduleForm.patchValue({
      fecha: appointment.fecha,
      horaInicioAgendamiento: appointment.horaInicioAgendamiento,
      horaFinAgendamiento: appointment.horaFinAgendamiento,
      idProveedor: appointment.idProveedor,
      idJaula: appointment.idJaula
    });

    const detalleArray = this.scheduleForm.get('detalle') as FormArray;
    detalleArray.clear();

    appointment.detalle.forEach((item: any) => {
      detalleArray.push(this.fb.group({
        idProducto: [item.idProducto, Validators.required],
        cantidad: [item.cantidad, Validators.required]
      }));
    });
  }

  // Delete an appointment
  deleteAppointment(idTurno: number): void {
    this.appointments = this.appointments.filter(appointment => appointment.idTurno !== idTurno);
    localStorage.setItem('appointments', JSON.stringify(this.appointments));
  }
}
