
import { NavItem } from './types';

export const SYSTEM_NAME = "ONYX KERNEL v5.0.1";
export const CORE_PURPOSE = "Hardening Infrastructure & 10x Digital Growth Engine";

export const NAVIGATION: NavItem[] = [
  { 
    label: 'Security', 
    command: 'run pentest_audit', 
    description: 'Offensive security: We break in so the bad guys can\'t.',
    view: 'security'
  },
  { 
    label: 'IT-Work', 
    command: 'sysctl --solve-problems', 
    description: 'Diagnostic mastery. We eliminate bottlenecks and solve the "unsolvable" tech debt.',
    view: 'it-work'
  },
  { 
    label: 'Web-Dev', 
    command: 'deploy customer_magnet', 
    description: 'High-conversion engineering. If your site isn\'t 10xing your traffic, it\'s broken. We fix that.',
    view: 'web-dev'
  },
  { 
    label: 'Consult', 
    command: 'query intelligence', 
    description: 'Direct access to Onyx strategic foresight and technical advisory.' 
  },
  { 
    label: 'Contact', 
    command: 'finger onyx_admin', 
    description: 'Secure line to Cristian Acevedo.' 
  }
];

export const ASCII_LOGO = `
 ██████  ███▄    █ ▓██   ██▓ ▒██   ██▒
▒██    ▒  ██ ▀█   █  ▒██  ██▒ ▒▒ █ █ ▒░
░ ▓██▄   ▓██  ▀█ ██▒  ▒██ ██░ ░░  █   ░
  ▒   ██▒▓██▒  ▐▌██▒  ░ ▐██▓░  ░ █ █ ▒ 
▒██████▒▒▒██░   ▓██░  ░ ██▒▓░ ▒██▒ ▒██▒
▒ ▒▓▒ ▒ ░░ ▒░   ▒ ▒    ██▒▒▒  ▒▒ ░ ░▓ ░
░ ░▒  ░ ░░ ░░   ░ ▒░ ▓██ ░▒░  ░░   ░▒ ░
░  ░  ░     ░   ░ ░  ▒ ▒ ░░    ░    ░  
      ░           ░  ░ ░       ░    ░  
                     ░ ░               
`;
