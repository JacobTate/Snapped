import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faPowerOff, faUser, faTrashAlt, faDownload, faFileDownload, faTag, faSave, faHeart, faPlusCircle, faMinusCircle, faSearch } from "@fortawesome/free-solid-svg-icons";

import { fab } from '@fortawesome/free-brands-svg-icons'

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faTrashAlt);
  library.add(faFileDownload);
  library.add(faTag);
  library.add(faSave);
  library.add(faHeart);
  library.add(faPlusCircle);
  library.add(faMinusCircle);
  library.add(faSearch);
}

export default initFontAwesome;
