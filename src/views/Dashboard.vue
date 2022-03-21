<template>
    <div class="container-dashboard p-3">
        <div class="grid-dashboard shadow-md p-3  rounded-lg flex ">
          <Menu></Menu>

            <div class="flex w-full bloque2y3  ">     
               
                <personas-1></personas-1>

                        
                <div class="bloque-3    w-full">
                
                    <div class="profile w-full flex justify-end">
                        <div class="self-center mx-1">Dr. Juan Sarmiento</div>
                        <a href="#" class="self-center text-xl  mx-1"><i class="text-gray-500 fas self-center fa-cog "></i></a>
                        <img src="../assets/img/profile-default.png" alt="" class="self-center mx-1 w-12 h-12 rounded-full">
                    </div>
                    <div class="menu  px-10 mt-8 text-xl flex justify-center">
                        <div class="w-4/12 text-center">
                            <button   id="buttonNuevaPersona"  @click="nuevaPersona()"><i class="fas fa-user text-3xl relative top-1 "></i> Nuevo Paciente</button>
                        </div>
                        <div class="w-4/12 text-center ">
                            <button id="buttonHistorias"  class="text-blue-600" @click="historiasClinicas()" href="#" ><i class="fas fa-calendar-alt text-3xl relative top-1 "></i> Historias Clinicas</button>
                        </div>
                        <div class="w-4/12 text-center">
                            <a href="#" > <i class="fas mx-2 text-3xl relative top-1 fa-clipboard-list"></i> Agenda</a>
                        </div>
                    </div>
                    <div>
                    
                    
                    <div class="bloque-personas2 h-auto">
                    <personas-2></personas-2>
                    </div>

                    <registrar-persona id="form_new_person" > </registrar-persona>
               
                    

                    </div>
                </div>

            </div>
        
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import global from '../global'
import Menu from '../components/Menu.vue';
import Personas1 from '../components/Personas1.vue';
import RegistrarPersona from '../components/RegistrarPersona.vue';
import Personas2 from '../components/Personas2.vue';
import Swal from 'sweetalert2';
window.Swal = Swal;

export default {
    name: 'Dashboard',
    components:{
        Personas1,
        Personas2,
        RegistrarPersona,
        Menu
    },
    data(){
        return{
            url: global.url,
            user: {
                first_name : '',
                last_name : '',
                document: '',
                img: '',
                type_person: ''
            },
            headers :{
              'Authorization' : localStorage.getItem('access_token')
            },

        }
    },
    computed:{
  

    },
    mounted(){
        this.getPeople();
    },
    methods:{
        getPeople(){

    

           axios.get(this.url+'api/person/1',  {headers: this.headers} ).
           then(res => {
               this.users_1 = res.data.people;
           }).
           catch(err => {
               if(err){
                   this.logout(false);
               }
           });

          axios.get(this.url+'api/person/2', {headers: this.headers}  ).
           then(res => {
               this.users_2 = res.data.people;
           }).catch(err => {
               if(err){
                   this.logout(false);
               }
           });
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
        },
        logout(band){

            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
            if(!band){
                this.$router.push('/login'); 
            }

        },
       
    }
}
</script>

<style>
.bloque-3 .bloque-personas2{
    max-height: 70vh;
}
#form_new_person{
    display: none;
    height:10vh !important;
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
    height: auto;
}
.grid-dashboard{
    height: 97vh;
    background: rgba(255, 255, 255, 0.55);
}
.fecha{
    align-self: flex-end !important;
}
@media (max-width: 1080px) { 
    .bloque2y3{
        flex-direction: column-reverse;
        height: 100%;
    }
    .bloque-3{
        margin-bottom: 50px;
    }
    .bloque2y3 .bloque-2{
        width: 95% !important;
        margin: 0 auto; 
    }
    .grid-dashboard{
        height: auto;
    }

    #form_new_person{
        margin-bottom: 300px;
    }
    
}


</style>