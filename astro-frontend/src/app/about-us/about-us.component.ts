import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  aboutItems = [
    { title: 'Kundli', description: 'Based on mathematical calculations using Vedic jyotish principles.', icon: '❖', position: 1 },
    { title: 'Health', description: "Secrets from Ayurveda to understand your child's unique dosha combination and body type.", icon: '❤️', position: 2 },
    { title: 'Personality', description: "Artistic or logical? Extrovert or introvert? Uncover your child's true nature.", icon: '🧠', position: 3 },
    { title: 'Profession', description: "Know which line of profession will make your child shine and excel in life.", icon: '💼', position: 4 },
    { title: 'Values', description: 'Uncover what drives your child: Dharma, Artha, Kama or Moksha?', icon: '🌌', position: 5 },
    { title: 'Gemstones', description: "Align your child's destiny with cosmic power with lucky colours and gemstones.", icon: '💎', position: 6 },
    { title: 'Lucky Name', description: 'Find the best syllable for the luckiest and most fortunate name for your baby.', icon: '🎵', position: 7 },
    { title: 'Famous Personalities', description: "Find out which celebrities share your child's birthstar!", icon: '⭐', position: 8 }
  ];
}
