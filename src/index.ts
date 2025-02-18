import { UserService } from "./services/user-service";
import { Role } from "./utils/enums";

const userService = new UserService();

console.log("===== 🚀 Initializing User Service =====\n");

// 1️⃣ Try to fetch all users when none exist
console.log("\n===== 🧐 Fetching Users Before Any Are Created =====");
try {
  console.log(userService.getAllUsers({} as any)); // Should throw an error
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Error: ${error.message}`);
  } else {
    console.error("❌ Unknown error occurred:", error);
  }
}

console.log("\n===== ✅ Creating Users =====");

// 2️⃣ Creating users
const admin = userService.createUser("Paco", "plamen@gmail.bg", Role.ADMIN);
const beti = userService.createUser("Beti", "beti@abv.bg", Role.USER);
const kalata = userService.createUser("Kalata", "kalata@yahoo.bg", Role.USER);

console.log("👥 Users Created:");
console.log(userService.getAllUsers(admin));

console.log("\n===== 🔍 Fetching a User By ID =====");

// 3️⃣ Fetch a specific user
try {
  console.log("Fetching Beti's profile:");
  console.log(userService.getUserById(admin, beti.id));
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Error: ${error.message}`);
  } else {
    console.error("❌ Unknown error occurred:", error);
  }
}

console.log("\n===== ✍️ Updating User Email =====");

// 4️⃣ Updating a user's email
try {
  userService.updateUser(admin, beti.id, { email: "bbolyarska@abv.bg" });
  console.log("✅ User updated successfully.");
  console.log(userService.getUserById(admin, beti.id));
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Error: ${error.message}`);
  } else {
    console.error("❌ Unknown error occurred:", error);
  }
}

console.log("\n===== 🚫 Attempting Unauthorized Update =====");

// 5️⃣ Unauthorized update attempt (should fail)
try {
  userService.updateUser(kalata, admin.id, { email: "hacked@example.com" });
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Error: ${error.message}`);
  } else {
    console.error("❌ Unknown error occurred:", error);
  }
}

console.log("\n===== 🗑️ Attempting to Delete a User =====");

// 6️⃣ Attempt to delete a user as a non-admin (should fail)
try {
  userService.deleteUser(kalata, beti.id);
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Error: ${error.message}`);
  } else {
    console.error("❌ Unknown error occurred:", error);
  }
}

console.log("\n===== 🗑️ Deleting a User as Admin =====");

// 7️⃣ Successful deletion by admin
try {
  userService.deleteUser(admin, beti.id);
  console.log("✅ User deleted successfully.");
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Error: ${error.message}`);
  } else {
    console.error("❌ Unknown error occurred:", error);
  }
}

console.log("\n===== 🔎 Trying to Fetch Deleted User =====");

// 8️⃣ Try to fetch a deleted user (should fail)
try {
  console.log(userService.getUserById(admin, beti.id));
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Error: ${error.message}`);
  } else {
    console.error("❌ Unknown error occurred:", error);
  }
}

console.log("\n===== 🗑️ Trying to Delete Non-existent User =====");

// 9️⃣ Try to delete a non-existent user
try {
  userService.deleteUser(admin, "non-existent-id");
} catch (error) {
  if (error instanceof Error) {
    console.error(`❌ Error: ${error.message}`);
  } else {
    console.error("❌ Unknown error occurred:", error);
  }
}

console.log("\n===== 🎉 All tests completed! =====");
