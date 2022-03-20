<template>
<div class="personas2 active" id="personas2">


        <div class="mt-5 px-8">
            <div class="personas-2 bg-white p-5 rounded-xl w-full">
                <div class="busqueda  flex justify-between ">
                    <div class="input-busqueda shadow border-2 rounded-xl w-7/12 flex">
                        <select  name="" id="" class="select-busqueda  bg-white  h-10 ">
                            <option value="1" class="" selected>Nombre</option>
                            <option value="2">Apellido</option>
                        </select>
                        <input type="text" class="w-10/12 border-l-2 px-5">
                        <button class="px-3 text-blue-600 ">Buscar</button>
                    </div>
                    <div class="filtros flex">
                        <a href="#" class="self-center font-bold text-2xl  mx-3">
                            <i class="fas fa-th-large"></i>
                        </a>
                        <a href="#" class=" self-center font-bold text-2xl mx-3 text-blue-600">
                            <i class="fas fa-list"></i>
                        </a>
                    </div>

                </div>

                <div class="personas-lista mt-8">

                    <div class="carta flex border-b-2 py-3" v-for="persona2 in personas2" :key="persona2.id">
                        <div class=" mx-4 " >
                            <span v-if="!persona2.img">
                            <img src="../assets/img/profile-default.png" class="w-12 h-12  rounded-full" alt="" srcset="">
                            </span>
                            <span v-else>
                                imagen
                            </span>
                        </div>
                        <div class="w-4/12 self-center  ">
                           {{persona2.first_name}} {{persona2.last_name}}
                        </div>
                        <div class="w-4/12  self-center  text-center ">
                            {{persona2.document}}
                        </div>
                        <div class="w-3/12  self-center flex justify-end   ">
                            <a href="#" class="text-2xl mx-1" ><i class="fas fa-trash-alt"></i></a>
                            <a href="#" class="text-2xl mx-1"><i class="fas fa-edit"></i></a>
                            <a href="#" class="text-2xl mx-1"><i class="fas fa-eye"></i></a>
                        </div>
                    </div>

                </div>
            </div>
        
        </div>
</div>
</template>

<script>
export default {
    name: 'Personas2',
    props: ['personas2'],
}
</script>

<style>

</style>