import {Album} from '../models/Album.js';
import {MenuAlbum} from '../models/MenuAlbum.js';

let menuAlb = new MenuAlbum();
let arrInput = document.querySelectorAll(".form-group input, .form-group select");
menuAlb.getAlbum();

// Thêm album
document.getElementById("btnThemAlbum").onclick = () => {
    
    let alb = new Album();

    arrInput.forEach((item,index) => {
        const {id,value} = item;
        if(id === 'theLoai'){
            let newValue = getText(value);
            alb = {...alb,[id]:newValue};
        }else{
            alb = {...alb,[id]:value};
        }
    });
    
    // Kiểm tra điều kiện
    let isValid = checkProp(alb.tenAlbum);

    if(isValid){
        menuAlb.addAlbum(alb);
        showListAlbum();
        menuAlb.saveAlbum();
    }else{
        alert("Tên album không được trùng");
    }
    //reset
    resetFunc();
}

// Hàm hiển thị danh sách Album
const showListAlbum = () => {
    let content = '';
    let dsAlbum = menuAlb.danhSachAlbum;

    dsAlbum.forEach((item,index) => {
        content += `
            <div class="col-md-4">
            <div class="card mb-4 box-shadow" >
            <div class="reponsive-img"  style="background-image: url(${item.linkAnh});">
            <!-- <img style="width:100%;height:100%" class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="http://hinhnendepnhat.net/wp-content/uploads/2017/11/Hinh-anh-dep-girl-xinh-de-thuong-nhat-nam-mau-tuat-2018.jpg" data-holder-rendered="true" style="opacity: 0;"> -->
            </div>
            <div class="card-body">
                <h3>${item.tenAlbum}</h3>
                <p class="card-text">Nội dung mô tả: ${item.moTa}</p>
                <p class="card-text">Thể loại: ${item.theLoai}</p>
                <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button type="button" class="btn btn-success text-white btn-sm btn-outline-secondary mr-2" onclick="xuLySua('${item.tenAlbum}')"=>Chỉnh sửa</button>
                    <button type="button" class="btn btn-danger text-white btn-sm btn-outline-secondary" onclick="xuLyXoa('${item.tenAlbum}')">Xóa</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        `;
    })
    document.getElementById('listAlbum').innerHTML = content;
}
showListAlbum();

// Xóa album
window.xuLyXoa = (tenAlbum) => {
    let cf = confirm("Bạn có muốn xóa album này không?");
    if(cf){
        menuAlb.removeAlbum(tenAlbum);
        menuAlb.saveAlbum();
        showListAlbum();
        alert("Xóa thành công");
    }
}

// Hiển thị album cần sửa
let newAlbum = {};
window.xuLySua = (tenAlbum) => {
    newAlbum = menuAlb.editAlbum(tenAlbum,arrInput);
    document.getElementById("btnCapNhatAlbum").disabled = false;
    document.getElementById("btnThemAlbum").disabled  = true;
}
// Cập nhật album sửa
window.document.getElementById("btnCapNhatAlbum").onclick = () => {

    const dsAlbum = menuAlb.danhSachAlbum;
    let index = dsAlbum.findIndex(item => item.tenAlbum == newAlbum.tenAlbum);

    arrInput.forEach((item,i) => {
        const {value,id} = item;
        if(id === 'theLoai'){
            let newValue = getText(value);
            menuAlb.danhSachAlbum[index] = {...menuAlb.danhSachAlbum[index],[id]:newValue};
        }else{
            menuAlb.danhSachAlbum[index] = {...menuAlb.danhSachAlbum[index],[id]:value};
        }
    })

    menuAlb.saveAlbum();
    showListAlbum();
    
    //reset
    resetFunc();
    document.getElementById("btnCapNhatAlbum").disabled = true;
    document.getElementById("btnThemAlbum").disabled  = false;
}

// Hàm kiểm tra thuộc tính duy nhất
const checkProp = (key) => {
    let dsAlbum = menuAlb.danhSachAlbum;
    let isValid = true;
    dsAlbum.forEach((item,index) => {
        if(item.tenAlbum === key)
            isValid = false;   
    })
    return isValid;
}

// Hàm lấy value text trong select
const getText = (value) => {
    if(value === '1')
        return 'Album gái xinh';
    else if(value === '2')
        return 'Album trai đẹp';
    else
        return 'Album idol';
}

// Hàm reset
const resetFunc = () => {
    arrInput.forEach((item,index) => {
        const {id,value} = item;
        if(id === 'theLoai'){
            document.getElementById(id).value = value;
        }else{
            document.getElementById(id).value = '';
        }
    });
}