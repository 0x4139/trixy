import { writable } from "svelte/store";

// Create a writable store with the initial options
export const appSidebarMenus = writable([]); //TODO: use if there are pages with no sidebar
