<template>
    <div class="container-dashboard p-3">
        <div class="grid-dashboard shadow-md p-3  rounded-lg flex ">
            <div class="bloque-1  flex  justify-center    w-1/12">
                <ul class="self-center text-3xl ">
                    <li class="my-12 ">
                        <router-link to ="/dashboard" class="flex  flex-col">
                        <i class=" text-gray-400 fas self-center fa-home"></i> <span class="text-sm text-center">Inicio</span>
                        </router-link>
                    </li>
                     <li class="my-12">
                        <router-link to ="/config" class="flex flex-col">
                        <i class="text-gray-400 fas self-center fa-cog"></i> <span class="text-sm text-center">Configurar</span>
                        </router-link>
                    </li>             
                     <li class="my-12">
                        <router-link to ="/plan" class="flex flex-col">
                        <i class="text-gray-400 fas self-center fa-ellipsis-h "></i> <span class="text-sm text-center">Plan</span>
                        </router-link>
                    </li>
                </ul>
            </div>

            <div class="flex w-full bloque2y3  ">     
               
                <personas-1 :personas1="users_1"></personas-1>

                        
                <div class="bloque-3   w-full">
                
                    <div class="profile w-full  flex justify-end">
                        <div class="self-center mx-1">Dr. Juan Sarmiento</div>
                        <a href="#" class="self-center text-xl  mx-1"><i class="text-gray-500 fas self-center fa-cog "></i></a>
                        <img src="../assets/img/profile-default.png" alt="" class=" mx-1 w-12 h-12 rounded-full">
                    </div>
                    <div class="menu px-10 mt-8 text-xl flex justify-center">
                        <div class="w-4/12 text-center">
                            <button   id="buttonNuevaPersona"  @click="nuevaPersona()"><i class="fas fa-user text-3xl relative top-1 "></i> Nuevo Paciente</button>
                        </div>
                        <div class="w-4/12 text-center ">
                            <button id="buttonHistorias"  @click="historiasClinicas()" href="#" ><i class="fas fa-calendar-alt text-3xl relative top-1 "></i> Historias Clinicas</button>
                        </div>
                        <div class="w-4/12 text-center">
                            <a href="#" > <i class="fas mx-2 text-3xl relative top-1 fa-clipboard-list"></i> Agenda</a>
                        </div>
                    </div>
                    <div>
                    <personas-2 :personas2="users_2"></personas-2>

                    <div class="form-new-person" id="form_new_person">
                        <form @submit.prevent="registerPerson()">
                            <div class="mt-5 px-8">
                                <div class="personas-2 bg-white p-5 rounded-xl w-full">
                                    <h4 class="text-center">Nuevo Paciente</h4>
                                    <div class="inputs mt-6 px-1 mx-3 flex justify-between ">
                                        <div class="input-box  w-5/12 mb-4">
                                        <label for="" class="block  text-gray-400 ">Nombre</label>
                                        <input type="text"  class="w-full h-10 p-1 outline-0 rounded-lg shadow-input" v-model="user.first_name" placeholder="Nombre">
                                        </div>

                                        <div class="input-box  w-5/12">
                                        <label for="" class="block  text-gray-400 ">Apellido</label>
                                        <input type="text"  class="w-full outline-0 h-10 p-1 rounded-lg shadow-input" v-model="user.last_name" placeholder="Apellido">
                                        </div>  
                                                            
                                    </div> 
                                    <div class="inputs  px-1 mx-3 flex justify-between ">
                                        <div class="input-box  w-5/12 mb-4">
                                        <label for="" class="block  text-gray-400" >DNI</label>
                                        <input type="text"  class="w-full h-10 p-1 outline-0 rounded-lg shadow-input" v-model="user.document" placeholder="DNI">
                                        </div>

                                        <div class="input-box  w-5/12">
                                        <label for="" class="block  text-gray-400 ">Email</label>
                                        <input type="email"  class="w-full outline-0 h-10 p-1 rounded-lg shadow-input" v-model="user.email" placeholder="Email">
                                        </div>                  
                                    </div>  
                                    <div class="inputs  px-1 mx-3 flex justify-between ">
                                        <div class="input-box  w-5/12 mb-4">
                                        <label for="" class="block  text-gray-400 ">Tipo de Personas</label>
                                        <select name="" v-model="user.type_person" id="" class="w-full h-10 p-1 outline-0 bg-white rounded-lg shadow-input">
                                            <option value="selected">Selecciona</option>
                                            <option value="1">Persona de TIPO 1</option>
                                            <option value="2">Persona de TIPO 2</option>

                                        </select>
                                        </div>

                                        <div class="input-box  w-5/12">
                                        <label for="" class="block  text-gray-400 ">Imagen de Perfil</label>
                                        <input type="file"  class="w-full outline-0 h-10 p-1 rounded-lg shadow-input" placeholder="Email">
                                        </div>  
                                                        
                                    </div>  
                                    <div class="text-center my-5">
                                        <input type="submit"  class="p-3 cursor-pointer rounded-md bg-blue-600 hover:bg-blue-800  transition-all  text-sm text-white" value="Registrar Usuario"/>
                                    </div> 
                                </div>
                            </div>
                        </form>
                    </div>

                    </div>
                </div>

            </div>
        
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import global from '../global'
import Personas1 from '../components/Personas1.vue';
import Personas2 from '../components/Personas2.vue';

export default {
    name: 'Dashboard',
    components:{
        Personas1,
        Personas2
    },
    data(){
        return{
            users_1: [],
            users_2: [],
            url: global.url,
             headers : {
              'Authorization' : localStorage.getItem('access_token')
            },
            user: []
        }
    },
    computed:{
  

    },
    mounted(){
        this.getPeople();
    },
    methods:{
        getPeople(){
             
           axios.get(this.url+'api/person/1', {headers: this.headers}  ).
           then(res => {
               this.users_1 = res.data.people;
           });

            axios.get(this.url+'api/person/2', {headers: this.headers}  ).
           then(res => {
               this.users_2 = res.data.people;
           });
        },
        registerPerson(){
            console.log(this.user);
        },
        nuevaPersona(){
            const form = document.querySelector('#form_new_person');
            const personas2 = document.querySelector('#personas2');
            personas2.classList.remove('active');
            form.classList.add('active');

            const buttonHistorias = document.querySelector('#buttonHistorias');
            buttonHistorias.classList.remove('text-blue-600');

            const buttonNuevaPersona = document.querySelector('#buttonNuevaPersona');
            buttonNuevaPersona.classList.add('text-blue-600');
        },
        historiasClinicas(){

            const form = document.querySelector('#form_new_person');
            const personas2 = document.querySelector('#personas2');
            personas2.classList.add('active');
            form.classList.remove('active');


            const buttonHistorias = document.querySelector('#buttonHistorias');
            buttonHistorias.classList.add('text-blue-600');

            const buttonNuevaPersona = document.querySelector('#buttonNuevaPersona');
            buttonNuevaPersona.classList.remove('text-blue-600');
        }
    }
}
</script>

<style>
#form_new_person{
    display: none;
}
#personas2{
    display: none;
}
.active{
    display: block !important;
}
.personas2{
    display: none;
}
.router-link-exact-active i, .router-link-exact-active span{
    color: blue;
}
.container-dashboard{
    background: url('../assets/img/bg-dashboard.png') fixed center  ;
    height: 100vh;
}
.grid-dashboard{
height: 90vh;
background: rgba(255, 255, 255, 0.55);
}
.fecha{
    align-self: flex-end !important;
}
@media (max-width: 1080px) { 
    .bloque2y3{
        flex-direction: column-reverse;
    }
    .bloque2y3 .bloque-2{
        margin-top: 20px !important;
        width: 95% !important;
        margin: 0 auto;

    }
    .grid-dashboard{
        height: 95vh;
    }
}


</style>