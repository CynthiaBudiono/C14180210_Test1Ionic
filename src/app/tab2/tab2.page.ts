import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public fotoService:FotoService, private afStorage : AngularFireStorage,) {}
  dataupload: number[] = [];
  urlImageStorage: string[] = [];
  async ngOnInit(){
    // this.fotoService.dataFoto=[];
    await this.fotoService.loadFoto();
  }

  tambahfoto(){
    // alert("masuk");
    this.fotoService.tambahFoto();
  }

  pilih(idx){
    alert(idx);
    var cek = 0; 
    for(var i = 0; i < this.dataupload.length && cek == 0; i++) {
      if(this.dataupload[i] == idx) { 
        cek = 1; 
        this.dataupload.splice(i,1); 
      }
    }

    if(cek == 0) {
      this.dataupload.push(idx); 
    }
  }

  uploadFoto(){
    this.urlImageStorage=[];
    //buat ambil data di fotoservice trus mau diupload
    for (var index in this.dataupload){
      var i = this.dataupload[index];
      const imgFilepath = `imgStorage/${this.fotoService.dataFoto[i].filePath}`;
      this.afStorage.upload(imgFilepath, this.fotoService.dataFoto[i].dataImage).then(() => {
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url) =>{
          // alert("urllll" + url);
          this.urlImageStorage.unshift(url);
          console.log("url di upload foto: "+url);
        });
      });
    }
  }
}
