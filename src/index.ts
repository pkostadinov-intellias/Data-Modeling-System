import { UserService } from "./services/user-service";
import { Role } from "./utils/enums";

const userService = new UserService();

const admin = userService.createUser("Paco", "plamen@gmail.bg", Role.ADMIN);
const beti = userService.createUser("Beti", "beti@abv.bg", Role.USER);
const kalata = userService.createUser("Kalata", "kalata@yahoo.bg", Role.USER);

try {
  userService.deleteUser(kalata, beti.id);
} catch (error) {
  console.log(error.message);
}

userService.updateUser(kalata, beti.id, { email: "bbolyarska@abv.bg" });
