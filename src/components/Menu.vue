<template>
    <div class="bloque-1  flex  justify-center w-1/12">
        <ul class="self-center text-3xl ">
            <li class="my-10 ">
                <router-link to ="/dashboard" class="flex  flex-col">
                <i class=" text-gray-400 fas self-center fa-home"></i> <span class="text-sm text-center">Inicio</span>
                </router-link>
            </li>
                <li class="my-10">
                <router-link to ="/config" class="flex flex-col">
                <i class="text-gray-400 fas self-center fa-cog"></i> <span class="text-sm text-center">Configurar</span>
                </router-link>
            </li>             
                <li class="my-10">
                <router-link to ="/plan" class="flex flex-col">
                <i class="text-gray-400 fas self-center fa-ellipsis-h "></i> <span class="text-sm text-center">Plan</span>
                </router-link>
            </li>
            <li class="my-10">
                <a href="#" @click.prevent="logout()" class="flex flex-col">
                <i class="text-gray-400 self-center fas fa-sign-out-alt"></i> <span class="text-sm text-center">Logout</span>
                </a>
            </li>
        </ul>
    </div>
</template>


<script>
export default {
    name: 'Menu'
}
</script>