import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'; // Asegúrate de importar el Router

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrección: styleUrls en lugar de styleUrl
})
export class AppComponent {
  title = 'agendamiento';

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }
}
