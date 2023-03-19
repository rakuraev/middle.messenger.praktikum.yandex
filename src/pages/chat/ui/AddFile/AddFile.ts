import { WSChatController } from 'entities/Chat';
import { ResourcesController } from 'entities/Resources';
import { Block } from 'shared/lib/core';
import { Toast, useToast } from 'shared/lib/toast';
import { uploadFile, UploadFileMIMETypes } from 'shared/lib/uploadFile';
import { Tooltip } from 'shared/ui';
import { TooltipPositions } from 'shared/ui/Tooltip';
import './addFile.css';

interface IAddFileRefs {
  tooltip: Tooltip;
}

interface IAddFileProps {
  tooltipPosition: TooltipPositions;
  toast: Toast;
  ws: WSChatController;
  onContentClick: (e: Event) => void;
  events: { click: (e: Event) => void };
}

enum AddFileEvenets {
  AddFile = 'add-file',
  AddMedia = 'add-media',
}

export class AddFile extends Block<IAddFileProps, IAddFileRefs> {
  static _name = 'AddFile';

  constructor(props: IAddFileProps) {
    const onClick = () => {
      this.refs.tooltip.showTooltip();
    };

    const toast = useToast;

    const tooltipPosition = TooltipPositions.topRight;

    const onContentClick = (e: Event) => {
      const target = e.target as Nullable<HTMLElement>;
      if (target) {
        const targetParentElement = target.closest(
          '[data-event]'
        ) as Nullable<HTMLElement>;
        if (targetParentElement) {
          const eventType = targetParentElement.dataset
            .event as Nullable<AddFileEvenets>;

          if (eventType === AddFileEvenets.AddFile) {
            console.log('Addfile');
          } else if (eventType === AddFileEvenets.AddMedia) {
            this.addMediaFile();
          }
        }
      }
    };

    super({
      ...props,
      toast,
      onContentClick,
      tooltipPosition,
      events: { click: onClick },
    });
  }

  addMediaFile() {
    uploadFile(UploadFileMIMETypes.MEDIA, this.onInput.bind(this));
  }

  async onInput(event: Event) {
    const file = (event?.target as HTMLInputElement)?.files?.[0];
    if (file) {
      try {
        const res = await ResourcesController.uploadFile(file);
        if (this.state.ws.isConnected() && res) {
          this.state.ws.sendFile(res.id.toString());
        }
      } catch (error) {
        const reason = (error as XMLHttpRequest)?.response?.reason;
        if (reason) {
          this.state.toast.error(reason);
        }
      }
    }
  }

  render(): string {
    return ` <div class="add-file">
                {{{SvgTemplate svgId="add-file"}}}
                {{#Tooltip ref="tooltip" onContentClick=onContentClick offsetY=38.5 position=tooltipPosition}}
                  <div class="add-file__media" data-event="add-media">
                    {{{SvgTemplate svgId="media"}}}
                    <span class="add-file__label">Фото</span>
                  </div>      
                {{/Tooltip}}
              </div>`;
  }
}
