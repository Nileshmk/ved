$(document).ready(function(){
  let key = 'AIzaSyBBgK8o7LZEv4TPG5Rfs-KFUoVFBR0PvXw';
  let playlistId = 'PLTjRvDozrdlxj5wgH4qkvwSOdHLOCx10f';
  let URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
  let URL2 = 'https://www.googleapis.com/youtube/v3/videos';
  let id = 'z3-XFI_nXNM';
  let options = {
      part:'snippet',
      key: key,
      id: id
  }

  $.getJSON(URL2,options,function(data){
      console.log(data);
  });
});
