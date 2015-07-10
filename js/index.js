var imgSrc = 'img/3.png';

var imgCrop = new ImageCrop({
    sourceContainer: $('#source')[0], // 必选，图片所在的容器元素
    src: imgSrc, // 必选，图片地址
    imgCls: 'img maxImg', // 可选，图片元素img的classname，默认 img
    preImg: $('#prevImg')[0], // 可选，预览图片元素，已存在img元素
    areaImg: $('#areaImg')[0], // 可选，当前移动框所包含的图片内容
    width: 122, // 可选，默认移动框的宽度，默认 100
    height: 162, // 可选，默认移动框的高度，默认 100
    lockWHScale: true, // 可选，是否锁定宽高比，默认false
    defaultCenter: false, // 可选，是否默认出现在中心位置，默认true
    top: 10, // 可选，默认出现位置的top值（当defaultCenter为false时有效），默认0
    left:10, // 可选，默认出现位置的left值（当defaultCenter为false时有效），默认0
    
    minHeight: 10, // 可选，移动框的最小高度，默认20
    minWidth: 10, // 可选，移动框的最小宽度，默认20

    minImgWidth: 120, // 可选，预览图片的最小宽度，默认150
    minImgHeight: 120, // 可选，预览图片的最小高度，默认150
    
    // 可选，当移动的时候调用
    // 移动的概念是指 选择框的大小、位置 发生改变的时候
    onMove: function() {
        console.log('preInfo::', this.getPreInfo())
        console.log('areaInfo::', this.getAreaInfo())
        console.log('originInfo::', this.getOriginInfo())
    }
});

$('#J-download').on('click',function(){
    html2canvas($('#J-final-img')[0], {
      onrendered: function(canvas) {
        document.body.appendChild(canvas);

        var type = 'png';
        var imgData = canvas.toDataURL(type);
        var filename = 'fang_' + (new Date()).getTime() + '.' + type;
        imgData = imgData.replace(_fixType(type),'image/octet-stream');

        // download
        saveFile(imgData,filename);
      },
      allowTaint:true,
      useCORS:true
    });
});

$('#J-upload').on('change',function(){
    var $this = $(this);
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function(){
        // 通过 reader.result 来访问生成的 DataURL
        var url = reader.result;
        console.log('gouride');
        imgCrop.changeImage(url);
    };
    reader.readAsDataURL(file);
});

var _fixType = function(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return 'image/' + r;
};

var saveFile = function(data, filename){
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;
   
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
};
