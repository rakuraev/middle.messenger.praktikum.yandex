import { Block } from 'shared/lib/core';
import './tooltip.css';

interface ITooltipProps {
  offsetY: number;
  position: TooltipPositions;
  onContentClick: (e: Event) => void;
}

export enum TooltipPositions {
  topLeft = 'top-left',
  topCenter = 'top-center',
  topRight = 'top-rigth',
  bottomLeft = 'bottom-left',
  bottomCenter = 'bottom-center',
  bottomRight = 'bottom-rigth',
}

const TopTooltipPositions = [
  TooltipPositions.topCenter,
  TooltipPositions.topLeft,
  TooltipPositions.topRight,
];

const BottomTooltipPositions = [
  TooltipPositions.bottomCenter,
  TooltipPositions.bottomLeft,
  TooltipPositions.bottomRight,
];

export class Tooltip extends Block<ITooltipProps> {
  static _name = 'Tooltip';

  private _isVisible = false;

  private _bindedHideTooltip = this.hideTooltip.bind(this);

  private _bindedOnContentClick = this._onContentClick.bind(this);

  constructor(props: ITooltipProps) {
    super(props);
    this._addOnContentClick();
  }

  public toggleTooltip() {
    if (this._isVisible) {
      this.hideTooltip();
    } else {
      this.showTooltip();
    }
  }

  public showTooltip() {
    if (!this._isVisible) {
      this._isVisible = true;
      const contentElement = this._getTooltipContent();
      const position = this.state.position;
      if (contentElement) {
        const contentClientRect = contentElement.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        // Не идеально во всех сценария по возможности доделать
        if (
          position === TooltipPositions.bottomLeft ||
          position === TooltipPositions.topLeft
        ) {
          if (contentClientRect.right >= screenWidth + 20) {
            const offsetX = screenWidth - contentClientRect.right - 20;
            contentElement.style.transform = `translateX(${offsetX}px)`;
          } else {
            const offsetX = -contentClientRect.width;
            contentElement.style.transform = `translateX(${offsetX}px)`;
          }
        } else if (
          position === TooltipPositions.bottomCenter ||
          position === TooltipPositions.topCenter
        ) {
          if (contentClientRect.right >= screenWidth + 20) {
            const offsetX = screenWidth - contentClientRect.right - 20;
            contentElement.style.transform = `translateX(${offsetX}px)`;
          } else {
            const offsetX = -(contentClientRect.width / 2);
            contentElement.style.transform = `translateX(${offsetX}px)`;
          }
        } else if (
          position === TooltipPositions.bottomRight ||
          position === TooltipPositions.topRight
        ) {
          if (contentClientRect.right >= screenWidth + 20) {
            const offsetX = screenWidth - contentClientRect.right - 20;
            contentElement.style.transform = `translateX(${offsetX}px)`;
          }
        }

        if (this.state.offsetY) {
          if (BottomTooltipPositions.includes(position)) {
            contentElement.style.top = this.state.offsetY + 'px';
          } else if (TopTooltipPositions.includes(position)) {
            const parentElement = this.element?.parentElement;
            if (parentElement) {
              const parentNodeClientRect =
                parentElement.getBoundingClientRect();
              contentElement.style.bottom =
                parentNodeClientRect.height + this.state.offsetY + 'px';
            }
          }
        }
      }
      this.element?.classList.add('tooltip_show');
      setTimeout(
        () => document.addEventListener('click', this._bindedHideTooltip),
        10
      );
    }
  }

  public hideTooltip() {
    if (this._isVisible) {
      this._isVisible = false;
      document.removeEventListener('click', this._bindedHideTooltip);
      this.element?.classList.remove('tooltip_show');
      this.element?.classList.add('tooltip_hidding');
      setTimeout(() => {
        this.element?.classList.remove('tooltip_hidding');
      }, 101);
    }
  }

  private _getTooltipContent() {
    const element = this.element;
    if (element) {
      return element.querySelector(
        '.tooltip__content'
      ) as Nullable<HTMLElement>;
    }
  }

  private _addOnContentClick() {
    const contentElement = this._getTooltipContent();
    if (contentElement) {
      contentElement.addEventListener('click', this._bindedOnContentClick);
    }
  }

  private _onContentClick(e: Event) {
    e.stopPropagation();
    this.state.onContentClick(e);
  }

  componentBeforeUnmount(props: ITooltipProps) {
    const contentElement = this._getTooltipContent();
    if (contentElement) {
      contentElement.removeEventListener('click', this._bindedOnContentClick);
      document.removeEventListener('click', this._bindedHideTooltip);
    }
    super.componentBeforeUnmount(props);
  }

  render() {
    return `<div class="tooltip">
              <div class="tooltip__content" slot></div>
            </div>`;
  }
}
