const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
}

function hash_text(text){
    const myPassword = cipher('morganamx')
     return myPassword(text)
}

const put_params_bulding = (data) => {
    let { username ,id, valueBulding, stateBulding, currency, nameBulding, subDom,urlBulding } = data;

    let is_mobile = /Mobile/i.test(navigator.userAgent);
    let div_ifrm = document.getElementById(id);
    let params = `${username?`username=${username}`:''}${valueBulding?`&price=${valueBulding}`:''}${stateBulding?`&location=${stateBulding}`:''}${(is_mobile === false || is_mobile === true)?`&is_mobile=${is_mobile}`:''}${currency?`&currency=${currency}`:''}${nameBulding?`&nameBulding=${nameBulding}`:''}${subDom?`&subDom=${subDom}`:''}${urlBulding?`&urlBulding=${urlBulding}`:''}`;
    params = hash_text(params);
 

    if (/Mobile/i.test(navigator.userAgent)) {
      div_ifrm.innerHTML += `
        <iframe 
              src="http://nova.localhost:8003/quote/first_step/${params.length>0 ? `?${params}`:''}"
              style="width:100%; height:750px;"
          >
          </iframe>
 
       `
    } else {
    
      // El código se está ejecutando en un dispositivo de escritorio

    div_ifrm.innerHTML += `
     <iframe 
            src="http://nova.localhost:8003/quote/first_step/${params.length>0 ? `?${params}`:''}"
            style="width:100%; height:550px;"
        >
        </iframe>

      `
    
    }
}

window.onload = function() {
    let card_contact = document.getElementById('anchor-form');
    let des_form = document.getElementById('id_form_des')
    const ifm_mrg_data = document.getElementById('id_space_sb').dataset;
  //  if (/Mobile/i.test(navigator.userAgent)) {
    //  card_contact.style.display = 'none';
    //  des_form.classList.add('w-des')
 //   }
    const data = {
        username:'',
        id:'id_space_sb',
        valueBulding:ifm_mrg_data.valueBulding ? ifm_mrg_data.valueBulding : '0',
        stateBulding:ifm_mrg_data.stateBulding ? ifm_mrg_data.stateBulding : 'CDMX', 
        currency:ifm_mrg_data.currency  ? ifm_mrg_data.currency : 'MEX',
        nameBulding: ifm_mrg_data.nameBulding ? ifm_mrg_data.nameBulding : '',
        subDom: ifm_mrg_data.subDom ? ifm_mrg_data.subDom : '',
        urlBulding: ifm_mrg_data.urlBulding ? ifm_mrg_data.urlBulding:'',

    }
   put_params_bulding(data)
  };