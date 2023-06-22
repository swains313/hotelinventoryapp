import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { FormGroup ,FormBuilder, FormControl, FormArray, Validators} from '@angular/forms';
import { BookingService } from './booking.service';
import { exhaustMap, mergeMap, switchMap } from 'rxjs';
import { CustomValidator } from './validators/custom-validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit{


  removeGuest(index: number) {
this.guests.removeAt(index);
}


  deletePassport() {
    if(this.bookingForm.get('passport')){
      this.bookingForm.removeControl('passport');
    }
}

addPassport() {
this.bookingForm.addControl('passport',new FormControl(''));
}





addBooking() {
console.log(this.bookingForm.getRawValue());
// this.bookingService.bookRoom(this.bookingForm.getRawValue()).subscribe((data)=>{
// console.log(data);
// });
this.bookingForm.reset({
  roomId:'2',
      guestEmail:  '',
      checkinDate:  '',
      checkoutDate:  '',
      bookingStatus:  '',
      bookingAmount:  '',
      bookingDate:  '',
      mobileNumber:  '',
      guestName:  '',
      address: {
        addressLine1:  '',
        addressLine2:  '',
        City:  '',
        State:  '',
        Country:  '',
        ZipCode:  '',
      },
      guests:[],
      tnc:false
});

}

  bookingForm!: FormGroup;

  constructor(private configService:ConfigService, private fb:FormBuilder, private bookingService:BookingService,private route:ActivatedRoute){}
  
  
  ngOnInit(): void {

    const roomId=this.route.snapshot.paramMap.get('roomid');

    this.bookingForm=this.fb.group({
      // bookingId: string;
      // roomId: [''],  //roomId: new FormControl('') BOTH ARE SAME THIS THE SHORT CUT
      roomId: new FormControl({value: roomId, disabled: true},[Validators.required]),
      guestEmail:  ['', { updateOn:'blur', validators:[Validators.required, Validators.email]}],
      checkinDate:  [''],
      checkoutDate:  [''],
      bookingStatus:  [''],
      bookingAmount:  [''],
      bookingDate:  [''],
      mobileNumber:  ['',{updateOn:'blur'}],
      guestName:  ['',[Validators.required,Validators.minLength(5),CustomValidator.ValidateName, CustomValidator.ValidateSpecialChar('@')]],
      address: this.fb.group({
        addressLine1:  ['',{validators:[Validators.required]}],
        addressLine2:  ['',{validators:[Validators.required]}],
        City:  ['',{validators:[Validators.required]}],
        State:  ['',{validators:[Validators.required]}],
        Country:  [''],
        ZipCode:  [''],
      }),
      guests:this.fb.array([
        this.fb.group({
      guestName:['',{validators:[Validators.required]}],
      age:[''],

      })
      ]),
      tnc:new FormControl(false,{validators:[Validators.requiredTrue]})
      
      // guestList: [],

    }
    ,{updateOn:'blur', validators: [CustomValidator.validateDate]}
    );
    console.log('NG ON IT CALLED FROM BOOKING COMPONENT');
    
    this.getBookingData();

//     this.bookingForm.valueChanges.subscribe((data)=>{
//       console.log(data);
//       // this.bookingService.bookRoom(data).subscribe((data)=>{ });
// })


    this.bookingForm.valueChanges.pipe(
      exhaustMap((data)=>this.bookingService.bookRoom(data))
    ).subscribe((data)=> console.log(data)
    )

  }

  get guests(){
    return this.bookingForm.get('guests') as FormArray;
  } 
    

  addGuest() {

    this.guests.push(
      this.fb.group({ guestName:[''], age:[''],
        })
    );
    }


    getBookingData(){
      this.bookingForm.patchValue({
        // roomId:'2',
        guestEmail:  'test@gmail.com',
        checkinDate:  new Date('10-Feb-2023'),
        checkoutDate:  '',
        bookingStatus:  '',
        bookingAmount:  '',
        bookingDate:  '',
        mobileNumber:  '',
        guestName:  '',
        address: {
          addressLine1:  '',
          addressLine2:  '',
          City:  '',
          State:  '',
          Country:  '',
          ZipCode:  '',
        },
        guests:[],
        tnc:false


      })
    
    }


  
}
