<template>
    <div class="form-new-person" >
                        <form @submit.prevent="registerPerson()">
                            <div class="mt-5 px-8">
                                <div class="personas-2 bg-white p-5 rounded-xl w-full">
                                    <h4 class="text-center">Nuevo Paciente</h4>
                                    <div class="inputs mt-6 px-1 mx-3 flex justify-between ">
                                        <div class="input-box  w-5/12 mb-4">
                                        <label for="" class="block  text-gray-400 ">Nombre</label>
                                        <input type="text"    class="w-full h-10 p-1 outline-0 rounded-lg shadow-input" v-model="user.first_name" placeholder="Nombre">
                                        <span class="font-bold text-red-600" v-if="errors.first_name">Nombre Requerido</span>
                                        </div>

                                        <div class="input-box  w-5/12">
                                        <label for="" class="block  text-gray-400 ">Apellido</label>
                                        <input type="text"  class="w-full outline-0 h-10 p-1 rounded-lg shadow-input" v-model="user.last_name" placeholder="Apellido">
                                        <span class="font-bold text-red-600" v-if="errors.last_name">Apellido Requerido</span>

                                        </div>  
                                                            
                                    </div> 
                                    <div class="inputs  px-1 mx-3 flex justify-between ">
                                        <div class="input-box  w-5/12 mb-4">
                                        <label for="" class="block  text-gray-400" >DNI</label>
                                        <input type="text"   class="w-full h-10 p-1 outline-0 rounded-lg shadow-input" v-model="user.document" placeholder="DNI">
                                        <span class="font-bold text-red-600" v-if="errors.document">Documento Inválido</span>
                                        </div>

                                        <div class="input-box  w-5/12">
                                        <label for="" class="block  text-gray-400 ">Email</label>
                                        <input type="email"   class="w-full outline-0 h-10 p-1 rounded-lg shadow-input" v-model="user.email" placeholder="Email">
                                        <span class="font-bold text-red-600" v-if="errors.email">Email Inválido</span>
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
                                        <input type="submit"  class="p-3 cursor-pointer rounded-md bg-blue-600 hover:bg-blue-800  transition-all  text-sm text-white" value="Registrar Usuario"/>
                                    </div> 
                                </div>
                            </div>
                        </form>
                    </div>
</template>

<script>
import axios from 'axios';
import global from '../global'
import Swal from 'sweetalert2';
window.Swal = Swal;

export default {
    name : 'RegistrarPersona',
    data(){
        return {
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
            errors: {
         
            }

        }
    },
    methods: {

        registerPerson(){
            const form = new FormData();
            form.append('first_name',this.user.first_name);
            form.append('last_name',this.user.last_name);
            form.append('email',this.user.email);
            form.append('type_person',this.user.type_person);
            form.append('document',this.user.document);
            form.append('img',this.user.img);
            axios.post(this.url+'api/person/register', form, {headers: this.headers}).
                then(res => {
                        if(res.data.code == 200){

                            if(this.user.type_person == 1){
                                this.users_1.push(res.data.persona);
                            }else if(this.user.type_person == 1){
                                this.users_2.push(res.data.persona);
                            }
                            this.clearForm();
                            Swal.fire('Registro Exitoso', 'Usuario registrado correctamente','success');
                            // FALTA QUE REDIRIJA Y LIMPIE EL FORMULARIO
                            
                            this.$router.push('/dashboard');
                        }if(res.data.code == 400){
                            this.errors = res.data.error;
                            console.log(res);
                        }



                }).
                catch(err => {
                    console.log(err);
                    this.errors = err.data.error;

                })
        },
        fileChange(){
        this.user.img =  this.$refs.file.files[0];
        },
        clearForm(){
        this.user = {
            first_name : '',
            last_name : '',
            document: '',
            img: '',
            email : ''
        };
        this.errors = {
            first_name : '',
            last_name : '',
            document: '',
            img: '',
            email : ''
        };
        },
        
    },
 
    mounted(){

    }
}
</script>

<style>


</style>