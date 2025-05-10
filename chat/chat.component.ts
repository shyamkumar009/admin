import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage, QuickResponse } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageContainer') private messageContainer!: ElementRef;
  
  isOpen = false;
  messages: { text: string; sender: 'user' | 'agent'; timestamp: Date }[] = [];
  newMessage = '';
  isAgentTyping: boolean = false;
  showQuickResponses: boolean = false;
  selectedCategory: string = 'general';
  categories: string[] = ['general', 'pricing', 'scheduling', 'services'];
  filteredQuickResponses: QuickResponse[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getMessages().subscribe(messages => {
      this.messages = messages.map(message => ({
        text: message.content,
        sender: message.sender === 'user' ? 'user' : 'agent',
        timestamp: new Date(message.timestamp)
      }));
    });

    this.chatService.getAgentTypingStatus().subscribe(status => {
      this.isAgentTyping = status;
    });

    this.chatService.getChatStatus().subscribe(status => {
      this.isOpen = status;
    });

    this.updateFilteredQuickResponses();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  toggleChat() {
    this.chatService.toggleChat();
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      // Add user message
      this.messages.push({
        text: this.newMessage,
        sender: 'user',
        timestamp: new Date()
      });

      // Simulate agent response (replace with actual API call)
      setTimeout(() => {
        this.messages.push({
          text: 'Thank you for your message. Our team will get back to you shortly.',
          sender: 'agent',
          timestamp: new Date()
        });
      }, 1000);

      this.newMessage = '';
    }
  }

  handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.chatService.sendMessage('', 'file', file);
      input.value = ''; // Reset input
    }
  }

  toggleQuickResponses() {
    this.showQuickResponses = !this.showQuickResponses;
    if (this.showQuickResponses) {
      this.updateFilteredQuickResponses();
    }
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.updateFilteredQuickResponses();
  }

  selectQuickResponse(response: QuickResponse) {
    this.chatService.sendMessage(response.text, 'quick-response');
    this.showQuickResponses = false;
  }

  private updateFilteredQuickResponses() {
    this.filteredQuickResponses = this.chatService.getQuickResponses(this.selectedCategory);
  }

  getFileIcon(fileType?: string): string {
    if (!fileType) return 'fa-file';
    
    if (fileType.startsWith('image/')) return 'fa-file-image';
    if (fileType.startsWith('video/')) return 'fa-file-video';
    if (fileType.startsWith('audio/')) return 'fa-file-audio';
    if (fileType.includes('pdf')) return 'fa-file-pdf';
    if (fileType.includes('word')) return 'fa-file-word';
    if (fileType.includes('excel') || fileType.includes('sheet')) return 'fa-file-excel';
    if (fileType.includes('powerpoint') || fileType.includes('presentation')) return 'fa-file-powerpoint';
    if (fileType.includes('zip') || fileType.includes('compressed')) return 'fa-file-archive';
    
    return 'fa-file';
  }

  private scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = 
        this.messageContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
} 