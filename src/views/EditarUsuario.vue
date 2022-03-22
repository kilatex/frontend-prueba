<template>
        <div class="container-dashboard p-3">
        <div class="grid-editar-perfil shadow-md p-3  rounded-lg flex ">
          <Menu></Menu>

            <div class="profile w-full">
                <h2 class="text-2xl text-center">Editar Paciente</h2>
                <div class="form-new-person block" >
                    <form @submit.prevent="updateUser()">
                        <div class="mt-5 px-8">
                            <div class="personas-2 bg-white p-5 rounded-xl w-full">
                                <h4 class="text-center">Editar Paciente</h4>
                                <div class="inputs mt-6 px-1 mx-3 flex justify-between ">
                                    <div class="input-box  w-5/12 mb-4">
                                    <label for="" class="block  text-gray-400 ">Nombre</label>
                                    <input type="text"    class="w-full h-10 p-1 outline-0 rounded-lg shadow-input" v-model="user.first_name" placeholder="Nombre">
                                    <span class="font-bold text-red-600" v-if="errors.first_name">Nombre NO Valido</span>
                                    </div>

                                    <div class="input-box  w-5/12">
                                    <label for="" class="block  text-gray-400 ">Apellido</label>
                                    <input type="text"  class="w-full outline-0 h-10 p-1 rounded-lg shadow-input" v-model="user.last_name" placeholder="Apellido">
                                    <span class="font-bold text-red-600" v-if="errors.last_name">Nombre NO Valido</span>

                                    </div>  
                                                        
                                </div> 
                                <div class="inputs  px-1 mx-3 flex justify-between ">
                                    <div class="input-box  w-5/12 mb-4">
                                    <label for="" class="block  text-gray-400" >DNI</label>
                                    <input type="text"   class="w-full h-10 p-1 outline-0 rounded-lg shadow-input" v-model="user.document" placeholder="DNI">
                                    <span class="font-bold text-red-600" v-if="errors.document">{{errors.document[0]}}</span>
                                    </div>

                                    <div class="input-box  w-5/12">
                                    <label for="" class="block  text-gray-400 ">Email</label>
                                    <input type="email"   class="w-full outline-0 h-10 p-1 rounded-lg shadow-input" v-model="user.email" placeholder="Email">
                                    <span class="font-bold text-red-600" v-if="errors.email">{{errors.email[0]}}</span>
                                    </div>                  
                                </div>  
                                <div class="inputs  px-1 mx-3 flex justify-between ">
                                    <div class="input-box  w-5/12 mb-4">
                                    <label for=""  class="block  text-gray-400 ">Tipo de Personas</label>
                                    <select name="" v-model="user.type_person" id="" class="w-full h-10 p-1 outline-0 bg-white rounded-lg shadow-input">
                                        <option  value ="" selected>Selecciona</option>
                                        <option value="1">Persona de TIPO 1</option>
                                        <option value="2">Persona de TIPO 2</option>
                                    </select>
                                    <span class="font-bold text-red-600" v-if="errors.type_person">
                                        Tipo de persona inválido
                                    </span>


                                    </div>

                                    <div class="input-box  w-5/12">
                                    <label for="" class="block  text-gray-400 ">Imagen de Perfil</label>
                                    <input type="file" ref="file" name="img"  @change="fileChange()" class="w-full outline-0 h-10 p-1 rounded-lg shadow-input" placeholder="Email">
                                    <span class="font-bold text-red-600" v-if="errors.img">
                                        Debe ser una imagen
                                    </span>
                                    </div>  
                                                    
                                </div>  
                                <div class="text-center my-5">
                                    <input type="submit"  class="p-3 cursor-pointer rounded-md bg-blue-600 hover:bg-blue-800  transition-all  text-sm text-white" value="Editar Usuario"/>
                                </div> 
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        
        </div>
    </div>
</template>

<script>
import global from '../global';
import axios from 'axios';
import Menu from '../components/Menu.vue';
import Swal from 'sweetalert2';
window.Swal = Swal;
export default {
    name : 'EditarUsuario',
    components:{
        Menu
    },
    mounted(){
        this.getUser();
    },
    data(){
        return {
            url : global.url,
            user: {
                first_name : '',
                last_name : '',
                document : '',
                type_document: '',
                img: ''
            },
            
            id_user : '',
            errors: {},
            headers : {
              'Authorization' : localStorage.getItem('access_token')
            },
        }
    },
    methods: {
        getUser(){
        this.id_user = this.$route.params.id;
        const url = this.url+'api/profile/'+this.id_user;

            axios.get(url,{headers:this.headers}).
            then(res => {
                this.user = res.data;
            }).
            catch(error => {
                console.log(error);
            });
         },
         updateUser(){

            const form = new FormData();
            
            form.append('first_name',this.user.first_name);
            form.append('last_name',this.user.last_name);
            form.append('email',this.user.email);
            form.append('type_person',this.user.type_person);
            form.append('document',this.user.document);
            if( this.$refs.file.files[0]){
                form.append('img',this.user.img);
            }
                console.log(this.user);
            axios.post(this.url+'api/person/update/'+this.id_user, form, {headers: this.headers}).
                then(res => {
                       if(res.data.code == 200){

                        Swal.fire({
                        title: 'Usuario Actualizado',
                        confirmButtonText: 'Ir a Inicio',
                        }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                            this.$router.push('/dashboard');

                        }
                        })
                    }if(res.data.code == 400){
                        this.errors = res.data.error;
                        console.log(res);
                    }



            }).
            catch(err => {
                console.log(err);

            });
        },
        fileChange(){
        this.user.img =  this.$refs.file.files[0];
        },
    }
        
    
}
</script>

<style>
.container-dashboard {
    height: 100vh;
}


</style>