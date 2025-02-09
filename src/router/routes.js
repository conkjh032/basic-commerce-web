import Anasayfa from "../pages/Anasayfa.vue";
import sepetim from "../pages/sepetim.vue";
import urun from "../pages/urun.vue";


export const routes = [
    { path: '/', component: Anasayfa },
    { path: '/Anasayfa', component: Anasayfa },
    { path: '/sepetim', component: sepetim },
    { path: '/urun/:id', component: urun, name: "urun"},
    // { path: '/saydamLens', component: saydamLens }

];