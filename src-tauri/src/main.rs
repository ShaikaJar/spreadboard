#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::{CustomMenuItem, Menu, Submenu};

fn main() {
    let file_menu = Submenu::new(
        "Projekt",
        Menu::new()
        .add_item(CustomMenuItem::new("open", "Öffnen"))
        .add_item(CustomMenuItem::new("save", "Speichern als..."))
        .add_item(CustomMenuItem::new("clear", "Projekt leeren"))
        .add_item(CustomMenuItem::new("example", "Lade Beispiel"))
    );
    let menu = Menu::new()
        .add_submenu(file_menu);
    
    tauri::Builder::default()
        .menu(menu)
        .on_menu_event(|event| {
            match event.menu_item_id() {
              "open" => {
                event.window().emit_and_trigger("file", "open").ok();
              }
              "save" => {
                event.window().emit_and_trigger("file", "save").ok();
              }
              "clear" => {
                event.window().emit_and_trigger("file", "clear").ok();
              }
              "example" => {
                event.window().emit_and_trigger("file", "example").ok();
              }
              _ => {}
            }
          })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
