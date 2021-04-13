import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastrarUsuarioComponent } from './cadastrar-usuario.component';

describe('CadastrarUsuarioComponent', () => {
  let component: CadastrarUsuarioComponent;
  let fixture: ComponentFixture<CadastrarUsuarioComponent>;
  const getElement = (name: string) => fixture.nativeElement.querySelector(name);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarUsuarioComponent ],
      imports: [
        ReactiveFormsModule, 
        FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("Inputs do formulário", () => {
    it("deve ter um input para o nome", () => {
      const input = getElement("#nameInput")
      expect(input.children[0].textContent).toBe("Nome");
    });

    it("deve ter um input para o email", () => {
      const input = getElement("#emailInput")
      expect(input.children[0].textContent).toBe("E-mail");
    });

    it("deve ter um input para confirmar o email", () => {
      const input = getElement("#emailConfirmationInput")
      expect(input.children[0].textContent).toBe("Confirme o seu e-mail");
    });

    it("deve ter um input para o telefone", () => {
      const input = getElement("#telefoneInput")
      expect(input.children[0].textContent).toBe("Telefone");
    });

    it("deve ter um input para o senha", () => {
      const input = getElement("#senhaInput")
      expect(input.children[0].textContent).toBe("Senha");
    });

    it("deve ter um input para confirmar a senha", () => {
      const input = getElement("#senhaConfirmationlInput")
      expect(input.children[0].textContent).toBe("Confirme a sua senha");
    });

    it("deve ter um input para adicionar a data de nascimento", () => {
      const input = getElement("#dataInput")
      expect(input.children[0].textContent).toBe("Data de nascimento");
    });


  });
});
