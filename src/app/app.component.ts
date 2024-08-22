import { Component, Renderer2, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgStyle } from "@angular/common";

class Item {
  task: string;
  data: number;
  checked?: boolean;

  constructor(task: string, data: number, checked: boolean) {
    this.task = task;
    this.data = data;
    this.checked = checked;
  }
}

@Component({
  selector: "my-app",
  standalone: true, //указывает что компонент будет независимым
  imports: [FormsModule, NgStyle],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private renderer: Renderer2) {}
  taskNumber = 1;
  text: string = "";
  data: number;
  checked: boolean;
  t: string;
  ngOnInit(): void {
    this.renderer.setStyle(document.body,'background-image','url(public/back.png)')
    this.loadData();
  }
  items: Item[] = [
    {
      task: "Описание задачи, например: Купить билеты",
      data: 2024,
      checked: false,
    },
  ];
  loadData(): void {
    for (let index = 0; index < localStorage.length; index++) {
      console.log(localStorage.key(index));
      this.t = localStorage.getItem(localStorage.key(index));
      console.log(this.t);
    }
  }
  addItem(text: string, data: number, checked: boolean): void {
    if (text == null || text.trim() == "" || data == null) return;
    this.items.unshift(new Item(text, data, checked));
    localStorage.setItem(text, data.toString());
  }
  
  removeItem(item: Item) {
    if (confirm("Точно удалить???"))
      this.items = this.items.filter((i) => i !== item);
  }

  removeItems(): void {
    this.items.length = 0;
    localStorage.clear();
  }

  activTask() {
    const selectedData = this.items.filter((item) => !item.checked);
    const newWindow = window.open("", "", "width=600,height=400");
    if (newWindow) {
      newWindow.document.write(this.generateTableHTML(selectedData));
    }
  }

  inactivTask() {
    const selectedData = this.items.filter((item) => item.checked);
    const newWindow = window.open("", "", "width=600,height=400");
    if (newWindow) {
      newWindow.document.write(this.generateTableHTML(selectedData));
    }
  }

  generateTableHTML(items: Item[]): string {
    let tableHTML = `
      <table  border="3" style="border-color: aqua; margin: 20px; align-items: center">
        <thead>
          <tr>
            <th>Выполненные задачи</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
    `;
    items.forEach((item) => {
      tableHTML += `
        <tr>
          <td>${item.task}</td>
          <td>${item.data}</td>
        </tr>
      `;
    });
    tableHTML += `
        </tbody>
      </table>
    `;
    return tableHTML;
  }
}
