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
import "./components/dropdownGuest/numbercategoryselector-guest.js";
import "./components/dropdownGuest2/numbercategoryselector-guest2.js";
