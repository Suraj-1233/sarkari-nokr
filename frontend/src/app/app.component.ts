import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  deferredPrompt: any;
  showInstallButton = false;

  ngOnInit() {
    if (this.isInStandaloneMode()) {
      console.log('Already installed - no install prompt needed');
      return;
    }

    if (!localStorage.getItem('installPromptDismissed')) {
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        this.deferredPrompt = event;
        this.showInstallButton = true;
      });
    }
  }

  installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
          localStorage.setItem('installPromptDismissed', 'true');
        }
        this.deferredPrompt = null;
        this.showInstallButton = false;
      });
    }
  }

  dismissInstallPrompt() {
    console.log('User manually dismissed install banner');
    localStorage.setItem('installPromptDismissed', 'true');
    this.showInstallButton = false;
  }

  isInStandaloneMode(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    );
  }
}
