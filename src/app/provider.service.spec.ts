// import { TestBed } from '@angular/core/testing';
//
// import { ProviderService } from './provider.service';
//
// describe('ProviderService', () => {
//   let service: ProviderService;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ProviderService);
//   });
//
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { Injectable } from '@angular/core';

interface Provider {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  providers: Provider[] = [];

  getProviders() {
    return this.providers;
  }

  addProvider(provider: Provider) {
    this.providers.push(provider);
  }

  updateProvider(provider: Provider) {
    const index = this.providers.findIndex(p => p.id === provider.id);
    if (index !== -1) {
      this.providers[index] = provider;
    }
  }

  deleteProvider(id: number) {
    this.providers = this.providers.filter(p => p.id !== id);
  }
}

