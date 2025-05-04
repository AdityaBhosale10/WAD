import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  newTask: string = '';
  tasks: string[] = [];
  editIndex: number | null = null;

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push(this.newTask.trim());
      this.newTask = '';
    }
  }

  editTask(index: number) {
    this.newTask = this.tasks[index];
    this.editIndex = index;
  }

  updateTask() {
    if (this.editIndex !== null && this.newTask.trim() !== '') {
      this.tasks[this.editIndex] = this.newTask.trim();
      this.editIndex = null;
      this.newTask = '';
    }
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    if (this.editIndex === index) {
      this.editIndex = null;
      this.newTask = '';
    }
  }
}
