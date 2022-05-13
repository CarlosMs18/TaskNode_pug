const listPendientes = document.querySelector('.listado-pendientes')
import Swal from 'sweetalert2'
import axios from 'axios'

if(listPendientes){
    
    listPendientes.addEventListener('click',e => {
        const htmlparentElement = e.target.parentElement.parentElement
        const icono = e.target
        const dataId = htmlparentElement.getAttribute('data-tarea')
        if(e.target.classList.contains('fa-check-circle')){
            console.log(e.target)
            const url = `${location.origin}/task/${dataId}`;
            axios.patch(url, {params : {dataId}})
                .then(result => {
                    console.log(result)
                    if(result.status === 200){
                        icono.classList.toggle('completo')
                    }
                   
                }).catch(err => console.log(err))
        }
    })

    listPendientes.addEventListener('click',e => {
        const htmlparentElement = e.target.parentElement.parentElement
        const icono = e.target
        const dataId = htmlparentElement.getAttribute('data-tarea')
        if(e.target.classList.contains('fa-trash')){
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
                    const url = `${location.origin}/task/${dataId}`;
                    axios.delete(url, {params : {dataId}})
                    .then(result => {
                        if(result.status === 200){

                            htmlparentElement.parentElement.removeChild(htmlparentElement)
                            
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                              )
                        }


                       
                    })
                    .catch()

                   
                }
              })
        }
    })
}


export default listPendientes


