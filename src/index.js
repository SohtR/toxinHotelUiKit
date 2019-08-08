function importAll(resolve) {
    resolve.keys().forEach(resolve);
}

importAll(
    require.context('./', true, /\.(scss)$/)
);
importAll(
    require.context('./', true, /\.(js)$/)
);

import "./components/dropdownRoom/numbercategoryselector.js";
import "./components/dropdownGuest/numbercategoryselectorGuest.js";
import "./components/dropdownGuest2/numbercategoryselectorGuest2.js";
