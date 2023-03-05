import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Category {
  label: string;
  value: string;
}

@Component({
  selector: 'add-investment',
  templateUrl: './add-investment.component.html',
})
export class AddInvestmentComponent implements OnInit {
  newInvestmentForm!: FormGroup;
  investmentCategories: Category[] = [];
  @Output() saveForm = new EventEmitter();
  @ViewChild('closeAddInvestmentModal')
  closeButton!: ElementRef<HTMLButtonElement>;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeCategory();
    this.initializeForm();
  }

  private initializeCategory() {
    this.investmentCategories = [
      { label: 'Select', value: '' },
      { label: 'Crypto Currency', value: 'CRYPTO' },
      { label: 'Indian Stocks', value: 'INDSTOCK' },
      { label: 'Mutual Funds', value: 'MUTUALFUNDS' },
      { label: 'US Stocks', value: 'USSTOCK' },
      { label: 'Other', value: 'OTHER' },
    ];
  }

  private initializeForm() {
    this.newInvestmentForm = this.fb.group({
      investmentName: ['', [Validators.required]],
      singleStockPrice: ['', [Validators.required]],
      noOfUnits: ['', [Validators.required]],
      boughtDate: ['', [Validators.required]],
      category: ['', [Validators.required]],
      notes: [''],
    });
  }

  get investmentName() {
    return this.newInvestmentForm.get('investmentName');
  }

  get singleStockPrice() {
    return this.newInvestmentForm.get('singleStockPrice');
  }

  get noOfUnits() {
    return this.newInvestmentForm.get('noOfUnits');
  }

  get boughtDate() {
    return this.newInvestmentForm.get('boughtDate');
  }

  get category() {
    return this.newInvestmentForm.get('category');
  }

  resetInvestmentForm() {
    this.newInvestmentForm.reset();
  }

  onSubmitForm() {
    this.newInvestmentForm.markAllAsTouched();
    if (this.newInvestmentForm.invalid) {
      return;
    }
    this.saveForm.emit(this.newInvestmentForm.value);
    this.closeButton.nativeElement.click();
  }
}
