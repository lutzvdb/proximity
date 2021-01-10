var lutzcomponent = {
    name: 'lutzcomponent',
    template: `Hallo<button v-on:click="lutzcomptest">Testit... lutzcomptestint: {{ lutzcomptestint }}, ubernommen: {{uebernommen}}</button>`,
    props: [
        'lutzcomptestint'
    ],
    data() {
        return {
            uebernommen: 0  
        }
    },
    mounted() {
        this.uebernommen = this.lutzcomptestint;
    },
    methods: {
        lutzcomptest() {
            alert('uebernommen: ' + this.uebernommen);
        }
    }
}