import { Database } from "@/types/database.types";

declare global {
	type DB = Database;
	type ToDo = DB["public"]["Tables"]["todos"]["Row"];
}
