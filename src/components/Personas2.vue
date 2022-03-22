<template>
<div class="personas2 active" id="personas2">


        <div class="mt-5 px-8">
            <div class="personas-2   bg-white p-5 rounded-xl w-full">
                <div class="busqueda flex justify-between ">
                    <form @submit.prevent="buscarUsuario()"  class=" flex w-7/12">

                        <div class="input-busqueda shadow border-2 rounded-xl w-full flex">
                            <select v-model="busqueda.select" name="" id="" class="select-busqueda  bg-white  h-10 ">
                                <option value="first_name" class="" selected>Nombre</option>
                                <option value="last_name">Apellido</option>
                            </select>
                            <input v-model="busqueda.text" type="text" class="w-10/12 border-l-2 px-5">
                            <button type="submit" class="px-3 text-blue-600 ">Buscar</button>
                        
                        </div>
                    </form>
                        <button @click="getResults()" class="ml-4 text-xl"><i class="fas fa-redo-alt"></i> <span class="word-actualizar">Actualizar</span></button>

                    <div class="filtros flex">
                        <a href="#" class="self-center font-bold text-2xl  mx-3">
                            <i class="fas fa-th-large"></i>
                        </a>
                        <a href="#" class=" self-center font-bold text-2xl mx-3 text-blue-600">
                            <i class="fas fa-list"></i>
                        </a>
                    </div>

                </div>

                <div class="container-personas2 ">
                    <div class=" mt-8  personas-lista" v-if="users">

                        <div class="carta flex border-b-2 py-3" v-for="persona2 in users" :key="persona2.id">
                            <div class=" mx-4 " >
                                <span v-if="!persona2.img">
                                <img src="../assets/img/profile-default.png" class="rounded-full w-12 h-12" alt="" srcset="">
                                </span>
                                <span v-else>
                                <img :src="url+'api/person/avatar/'+persona2.img" class=" w-12 h-12  rounded-full" alt="" srcset="">
                                </span>
                            </div>
                            <div class="w-4/12 self-center  ">
                            {{persona2.first_name}} {{persona2.last_name}}
                            </div>
                            <div class="w-4/12  self-center  text-center ">
                                {{persona2.document}}
                            </div>
                            <div class="w-3/12  self-center flex justify-end   ">
                                <a href="#" @click.prevent="confirmDelete(persona2.id)" class="text-2xl mx-1" ><i class="fas fa-trash-alt"></i></a>
                                <router-link :to="'/profile/'+persona2.id" class="text-2xl mx-1"><i class="fas fa-edit"></i></router-link>
                                <a href="#" class="text-2xl mx-1"><i class="fas fa-eye"></i></a>
                            </div>
                        </div>
                       
                    </div>
                    <div v-else class="mt-8 font-bold text-red-600">
                        {{messageUsers}}
                    </div>
                </div>

            </div>
    

          
        </div>
</div>
</template>

<script>

import global from '../global';
import axios from 'axios';
import Swal from 'sweetalert2';
window.Swal = Swal;
export default {
    name: 'Personas2',
    components:{
    },
    data(){
        return {
            url: global.url,
            users:{
            },
            paginacion:{},
            laravelData: {},
            headers : {
              'Authorization' : localStorage.getItem('access_token')
            },
            busqueda:{
                select: 'first_name'
            },
            messageUsers:""
        }
    },
    mounted(){
        this.getResults()
    },
   methods:{
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
                    this.getResults();
                    Swal.fire('Usuario Eliminado', '', 'success')
                })
            } else if (result.isDenied) {
                Swal.fire('Usuario No eliminado', '', 'info')
            }
                })
        },
        getResults(){
             axios.get(this.url+'api/person/2', {headers: this.headers}  ).
            then(res => {
                console.log(res);
                if(res.data.code == 400){
                    this.messageUsers = res.data.message;
                    this.users = "";
                }
                if(res.data.code==200){
                        this.users = res.data.people;

                }
            }).catch(err => {
                if(err){
                    this.logout(false);
                }
            });
        },
        logout(band){

            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            if(!band){
                this.$router.push('/login'); 
            }

        },
        buscarUsuario(){
            axios.post(this.url+'api/person/search',this.busqueda, {headers:this.headers}).
            then(res=>{
                if(res.data.code==400){
                    this.messageUsers = res.data.message;
                    this.users = "";
                }
                else if(res.data.code==200){
                    this.users = res.data.users;
                }
            });
        }
    }

}
</script>

<style>

.personas-2{
    display: flex !important;
    flex-direction: column;
}
.personas-lista{
    overflow: auto;
    height: 55vh !important;
}
.container-personas2{
    height: 100%;
}
@media (max-width: 1080px) { 
    .personas-lista{
        height: 500px;
        overflow: scroll;
    }
    .word-actualizar{
        display: none !important;
    }
}
@media (max-height: 800px) { 
    .personas-lista{
        height: 55vh;
    }
}
</style>