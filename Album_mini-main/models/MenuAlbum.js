export class MenuAlbum {
    danhSachAlbum = [];

    constructor(){

    }

    addAlbum(album) {
        this.danhSachAlbum.push(album);
    }

    removeAlbum(tenAlbum) {
        let index = this.danhSachAlbum.findIndex((item) => item.tenAlbum == tenAlbum);

        if(index !== -1)
            this.danhSachAlbum.splice(index,1);
    }

    editAlbum(tenAlbum,arrInput) {
        const editAlbum = this.danhSachAlbum.find(item => item.tenAlbum == tenAlbum);

        if(editAlbum.theLoai === 'Album gái xinh')
            editAlbum.theLoai = '1';
        else if(editAlbum.theLoai === 'Album trai đẹp')
            editAlbum.theLoai = '2';
        else
            editAlbum.theLoai = '3';
            
        arrInput.forEach((item,index) => {
            const {id} = item;
            document.getElementById(id).value = editAlbum[id];
        })
        return editAlbum;
    }

    updateAlbum() {

    }

    saveAlbum() {
        let sAlbum = JSON.stringify(this.danhSachAlbum);
        localStorage.setItem('album',sAlbum);
    }

    getAlbum() {
        if(localStorage.getItem('album')){
            let album = JSON.parse(localStorage.getItem('album'));
            this.danhSachAlbum = album;
        }
    }
}