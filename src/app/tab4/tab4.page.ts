import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  constructor(
    private afStorage : AngularFireStorage,
    public fotoService : FotoService) {

  }

  ngOnInit() {
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
        itemRef.getDownloadURL().then(url => {
          var nodebaru = {
            filePath: url,
            webviewPath: "",
            dataImage: null,
            namafile: ""
          }
          this.fotoService.dataFoto.unshift(nodebaru);
        });
      });
    }).catch((error) => {
      console.log(error);
    });
  }

}
