<script>
//The code below allows us to import and register two child components
import Lesson from './components/Lesson.vue';//child
import Checkout from'./components/Checkout.vue';//child
import Swal from 'sweetalert2';
import { throws } from 'assert';
import { Script } from 'vm';

export default({
    name: "App",
    components:{Lesson,Checkout},// further import and register children components
    data(){
        return{
            lessons:[],
            shoppingCart:[],
            activeComponent: "lesson",
        }
    },
    methods:{
        toggleActiveComponent(){
            if(this.activeComponent === "lesson"){
                this.activeComponent = "checkout"
            }else{
                this.activeComponent = "lesson"
            }
        },
        addLesson(id){
            let index = this.lessons.find((item)=>item._id === id);
            this.lessons[index].space -=1;
            this.shoppingCart.push(this.lessons[index]);
        },
        removeLesson(id){
            let index = this.lessons.findIndex((item)=> item._id === id);
            this.lessons[index].space +=1;

            const indexInCart = this.shoppingCart.findIndex((item)=> item._id === id);
            this.shoppingCart.splice(indexInCart,1);

        },
        confirmOrder(){
            Swal.fire({
                title: 'order has been successfully placed',
                text:'We will contact you regarding your order soon',
                icon: 'success'
            })
            this.toggleActiveComponent();
            this.shoppingCart = [];
        }
    },
    async mounted(){
        let response = await fetch("http://localhost:3000/api/lesson",{
            method: "GET",
        });
        let data = await response.json();
        this.lessons = data;
    }

})
</Script>

<template>
    <button class="cart" @click="toggleActiveComponent">Cart Items: {{ shoppingCart.length }}</button>

  <Lesson v-if="activeComponent === 'lesson'" :lessons="lessons" @addLesson="addLesson" />   
  <Checkout v-if="activeComponent === 'checkout'" :shoppingCart="shoppingCart" @removeLesson="removeLesson" @toggleComponent="toggleActiveComponent" @confirmOrder="confirmOrder" />
</template>

<style scoped>
</style>


