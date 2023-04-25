import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpModule} from '@angular/http';
import { Http, Headers } from '@angular/http';
import { Form } from '@angular/forms';

// apua saatavilla ehkä https://www.youtube.com/watch?v=EWjI-6wDC-8

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  book:Object;
  booktitle:String="";
  title: String="";
  author:String="";
  avai:String="";
  genre:String=""


  constructor(
    private router:Router,
    private authService:AuthService,
    private flashMessage: FlashMessagesService,
    private http:Http
  ) { }
  
 
  
    onSearchSubmit() {
      var as = this.http.post("http://localhost:3000/users/dashboard/" + this.booktitle, {responseType:'object'}).subscribe((resultData: any)=>{  //bank end id tyylii niin toimis ehkä
        //console.log(resultData);
        let info = JSON.parse(resultData._body)
        console.log(resultData)
        this.title = "";
        this.author = "";
        this.avai="";
        this.genre="";

        if(info.data =='Book not found') {
          this.flashMessage.show('Book not found', {cssClass: 'alert-success', timeout: 5000});
        }
        else{
          this.title = info.data.title;
          this.author = info.data.author;
          this.avai=info.data.available;
          this.genre=info.data.genre;
        }
      })
  
  }

  ngOnInit() {   
     
    }

}
