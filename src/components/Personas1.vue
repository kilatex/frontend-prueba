<template>
                   <div class="bloque-2  bg-white   p-3 px-4 rounded-2xl w-5/12">
                <div class="container-people1  h-auto w-full ">
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
                        <div class="personas">
                            <div v-for="persona1 in personas1" :key="persona1.id" class="person my-5 flex w-12/12 px-4 py-2 rounded-xl  justify-between">
                                <div class="profile-img  w-2/12">
                                    <span v-if="!persona1.img">
                                    <img src="../assets/img/profile-default.png" class="w-12 h-12  rounded-full" alt="" srcset="">
                                    </span>
                                    <span v-else>
                                        imagen
                                    </span>
                                 </div>
                                <div class=" w-8/12">
                                    <div class="font-bold">{{persona1.first_name}} {{persona1.last_name}} </div>
                                    <div>Consultor Online</div>
                                </div>
                                <div class="self-center">
                                    <a href="#" class="text-2xl  text-gray-400 hover:text-gray-600 transition-all"><i class="fas fa-plus"></i></a>
                                </div>
                            </div>
                        </div>
                </div>
                </div>
</template>

<script>
export default {
    name: 'Personas1',
    props: ['personas1']
}
</script>

<style>

</style>