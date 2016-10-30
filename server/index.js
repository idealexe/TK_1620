setInterval(function(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var d = new Date();
      // 取得したデータの整理
      var data = position.coords ;

      // データの整理
      var lat = data.latitude ;
      var lng = data.longitude ;
      // var alt = data.altitude ;
      // var accLatlng = data.accuracy ;
      // var accAlt = data.altitudeAccuracy ;
      // var heading = data.heading ;			//0=北,90=東,180=南,270=西
      // var speed = data.speed ;

      // アラート表示
      console.log("time: " + d.getTime() + "lat: " + lat + " lon: " + lng) ;

    } , function(error){
      // エラーコードのメッセージを定義
      var errorInfo = [
      "原因不明のエラーが発生しました…。" ,
      "位置情報の取得が許可されませんでした…。" ,
      "電波状況などで位置情報が取得できませんでした…。" ,
      "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
      ];
      // エラー番号
      var errorNo = error.code ;

      // エラーメッセージ
      var errorMessage = "[エラー番号: " + errorNo + "]\n" + errorInfo[ errorNo ] ;

      // アラート表示
      alert( errorMessage ) ;
    },
    {
      "enableHighAccuracy": false,
      "timeout": 10000,
      "maximumAge": 5000,
    });

  } else {
    // 対応していない場合
    // エラーメッセージ
    var errorMessage = "お使いの端末は、GeoLacation APIに対応していません。" ;

    // アラート表示
    alert( errorMessage ) ;
  }

}, 60000);

// var socket = io.connect('http://localhost:3000');
// socket.on('news', function (data) {
//   console.log(data);
//   socket.emit('my other event', { my: 'data' });
// });