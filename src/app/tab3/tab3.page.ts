import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  getnama:string;
  idx : number = 1;
  arrnama: any[];
  constructor(
    private afStorage : AngularFireStorage,
    public fotoService : FotoService) {

  }
  async ionViewDidEnter(){
    await this.fotoService.loadFoto();
    this.tampilkanData();
  }

  tampilkanData(){
    this.fotoService.dataFoto=[];
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
    .then((res) => {
      res.items.forEach((itemRef) => {
        // this.getnama= itemRef.name;
        // this.arrnama[this.idx] = this.getnama;
        // alert(this.arrnama[this.idx]);
        // this.idx= this.idx + 1;
        // alert(this.getnama);
        itemRef.getDownloadURL().then(url => {
          var data = {
            filePath: url,
            webviewPath: "",
            dataImage: null,
            namafile: itemRef.name
          }
          this.fotoService.dataFoto.unshift(data);
        });
      });
    }).catch((error) => {
      console.log(error);
    });
  }
}
