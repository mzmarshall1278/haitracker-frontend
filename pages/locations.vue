<template>
    <div class="container">
        <PageTitle pageTitle="Map" />
        <myMap/>
    </div>
</template>

<script>
import myMap from '~/components/allMap'
export default {
    middleware:[
    'checkAuth',    
    'Auth'
    ],
    components : {myMap}
}
</script>
