//Service Woker

if('serviceWorker' in navigator){
    console.log('Puedes usar el s ervidor')
    navigator.serviceWorker.register('./sw.js')
        .then(res => console.log('Serviceworker cargado correctamente ', res))
        .catch(err => console.log('Serviceworked NO cargado correctamente', err));
}else{
    console.log('No Puedes usar el s ervidor')

}



$(document).ready(function (){
    $("#menu a").click(function (e){
        e.preventDefault();

        console.log($('#services').offset());

        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset()
        });
        return false;
    })
});
