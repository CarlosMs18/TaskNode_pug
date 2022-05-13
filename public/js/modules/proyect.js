import Swal from 'sweetalert2'
import axios from 'axios'

const btnEliminar = document.getElementById('eliminar-proyecto')
if(btnEliminar){
    btnEliminar.addEventListener('click',e => {
        const urlProyecto = e.target.getAttribute('data-proyecto-url')
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
               const url = `${location.origin}/proyects/${urlProyecto}`;

               axios.delete(url,{params : {urlProyecto}})
                .then(result => {
                    Swal.fire(
                        'Proyecto Eliminado',
                        respuesta.data,
                        'success'
                    );

                    // redireccionar al inicio
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 3000);
                })
                .catch(() => {
                        Swal.fire({
                            type:'error',
                            title: 'Hubo un error',
                            text: 'No se pudo eliminar el Proyecto'
                        })
                    })
            }
        })
    })
}




export default btnEliminar