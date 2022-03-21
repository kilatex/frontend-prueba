<template>
    <div class="bloque-2  bg-white   p-3 px-4 rounded-2xl w-5/12">
        <div class="container-people1  w-full ">

            <div class="opciones flex  w-8/12  bg-gray-200 rounded-lg">
                <div class="py-1 w-6/12 bg-blue-600 rounded-lg text-white text-center">Citas</div>
                <div class="py-1 w-6/12 text-center text-blue-600">Consultas</div>
            </div>
            <div class="calendario mt-4 text-gray-400 flex ">
                <div class="dia-mes w-4/12">
                    <span class="text-blue-600">Dia</span>| Mes
                </div>
                <div class="fecha w-8/12  flex  justify-end">

                    <div>
                        <a href="#" class=" text-blue-600 text-lg"><i class="fas mr-2 fa-less-than"></i></a>
                        {{date}}
                            <a href="#" class=" text-blue-600 text-lg "><i class="fas ml-2 fa-greater-than"></i></a>
                    </div>
                </div>
            </div>
                <hr class="mt-2">
            <div class="personas-container">
                 <div class="personas">
                    <div v-for="persona1 in users" :key="persona1.id" class="person bg-gray-50  my-5 flex w-12/12 px-4 py-3 rounded-xl  justify-between">
                        <div class="profile-img  w-2/12">
                            <span v-if="!persona1.img">
                            <img src="../assets/img/profile-default.png" class="w-12 h-12  rounded-full" alt="" srcset="">
                            </span>
                            <span v-else>
                                <img :src="url+'api/person/avatar/'+persona1.img" class="w-12 h-12  rounded-full" alt="" srcset="">
                            </span>
                            </div>
                        <div class=" w-8/12">
                            <div class="font-bold">{{persona1.first_name}} {{persona1.last_name}} </div>
                            <div>Consultor Online</div>
                        </div>
                        <div class="self-center">
                            <a href="#" class="text-xl mr-2  text-gray-400 hover:text-gray-600 transition-all"><i class="fas fa-plus"></i></a>
                            <a href="#" @click.prevent="confirmDelete(persona1.id)" class="text-xl text-gray-400  hover:text-gray-600 transition-all" ><i class="fas fa-trash-alt"></i></a>

                        </div>
                    </div>
                    <div v-for="persona1 in users" :key="persona1.id" class="person my-5 flex w-12/12 px-4 py-2 rounded-xl  justify-between">
                        <div class="profile-img  w-2/12">
                            <span v-if="!persona1.img">
                            <img src="../assets/img/profile-default.png" class="w-12 h-12  rounded-full" alt="" srcset="">
                            </span>
                            <span v-else>
                                <img :src="url+'api/person/avatar/'+persona1.img" class="w-12 h-12  rounded-full" alt="" srcset="">
                            </span>
                            </div>
                        <div class=" w-8/12">
                            <div class="font-bold">{{persona1.first_name}} {{persona1.last_name}} </div>
                            <div>Consultor Online</div>
                        </div>
                        <div class="self-center personas1-opciones">
                            <a href="#" class="text-xl mr-2  text-gray-400 hover:text-gray-600 transition-all"><i class="fas fa-plus"></i></a>
                            <a href="#" @click.prevent="confirmDelete(persona1.id)" class="text-xl text-gray-400  hover:text-gray-600 transition-all" ><i class="fas fa-trash-alt"></i></a>

                        </div>
                    </div>
            </div>
            </div>

        </div>
    </div>
</template>

<script>
import global from '../global'
import axios from 'axios';
import Swal from 'sweetalert2';
window.Swal = Swal;

export default {
    name: 'Personas1',
    data(){
        return {
            url: global.url,
            users: [],
            headers : {
              'Authorization' : localStorage.getItem('access_token')
            },
        }
    },
    mounted(){
        this.getPeople();
    },
    methods:{
          getPeople(){
           axios.get(this.url+'api/person/1',  {headers: this.headers} ).
           then(res => {
               this.users = res.data.people;
           }).
           catch(err => {
               if(err){
                   this.logout(false);
               }
           });

        },
        confirmDelete(id){
            Swal.fire({
                title: '¿Está seguro de eliminar este usuario?',
                showDenyButton: true,
                confirmButtonText: 'Eliminar',
                denyButtonText: `Cancelar`,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                axios.delete(this.url+'api/person/'+id, {headers:this.headers}).
                then(res => {
                    console.log(res);
                    Swal.fire('Usuario Eliminado', '', 'success')
                    this.getPeople();
                })
            } else if (result.isDenied) {
                Swal.fire('Usuario No eliminado', '', 'info')
            }
                })
        },
    }
}
</script>

<style>

.personas-container{
    max-height: 78vh !important;
    overflow-y: auto;
}


@media (max-width: 1250px) { 
.bloque-2{
    padding-left: 5px;
    padding-right: 5px;
}

} 
</style>