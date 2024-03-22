import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const alertaWarning = (mensaje, id) => {
  onFocus(id);

  const MySwal = withReactContent(Swal)
  MySwal.fire({
    title: mensaje,
    icon: 'warning'
  })
}

const onFocus = (id) => {
    if(id !== ''){
        document.getElementById(id).focus();
    }
}

export { alertaWarning }