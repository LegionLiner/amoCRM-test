define([], function () {
  var CustomWidget = function () {
    var self = this,
      system = self.system(),
      langs = self.langs;
    const qs = (val) => document.querySelector(val);
    function getForms(names) {
      return {
        a: names[0],
        b: names[1],
        sum: names[2]
      }
    }
    function renderSettings() {
      let inputs = {
        a: "",
        b: "",
        sum: ""
      }
      if (self.inputNames) {
        inputs = getForms(self.inputNames);
      }
      let i = qs("#work-area-lp6ayugy1kv5jsrknzhb3z81urktc4wslqjtjnw9")
      let div = document.createElement("div")
      div.innerHTML = `<h3 style="margin-bottom: 15px; font-size: 18px;">В поля впишите имена строк, которые должны отслеживаться в сделках.</h3>
      <p style="margin-bottom: 10px;">Первое слагаемое</p>
      <input type="text" id="first-num" value="${inputs.a}">
      <p style="margin-bottom: 10px;">Второе слагаемое</p>
      <input type="text" id="second-num" value="${inputs.b}">
      <p style="margin-bottom: 10px;">Сумма</p>
      <input type="text" id="sum-num" value="${inputs.sum}" style="margin-bottom: 10px;">
      <button id="saveButton" style="padding: 5px 3px;"
      onmouseover="this.style.backgroundColor='#e7e6fa';"
      onmouseout="this.style.backgroundColor='#fff';">Сохранить</button>`;
      i.append(div)
      qs("#saveButton").addEventListener("click", () => {
        let aName = qs("#first-num").value;
        let bName = qs("#second-num").value;
        let sumName = qs("#sum-num").value;
        self.inputNames = [aName, bName, sumName];
        localStorage.setItem("choosen-inputs-amoCRM", JSON.stringify(self.inputNames))
      })
    }
    function setWidget() {
      let inputs = getForms(self.inputNames);
      let aInput = qs(`.linked-form__field__label[title="${inputs.a}"]`);
      let bInput = qs(`.linked-form__field__label[title="${inputs.b}"]`);
      let sumInput = qs(`.linked-form__field__label[title="${inputs.sum}"]`);
      self.inputs = [
        {
          el: aInput,
          val: aInput?.nextElementSibling?.children[0]
        },
        {
          el: bInput,
          val: bInput?.nextElementSibling?.children[0]
        },
        {
          el: sumInput,
          val: sumInput?.nextElementSibling?.children[0]
        }
      ];
      if (self?.inputs[1]?.val?.value && self?.inputs[0]?.val?.value) {
        self.inputs[2].val.value = +self.inputs[0].val.value + +self.inputs[1].val.value;
      }
    }
    this.callbacks = {
      settings() {
        return true;
      },
      init() {
        return true;
      },
      bind_actions() {
        return true;
        },
      render() {
        try {
          self.inputNames = JSON.parse(localStorage.getItem("choosen-inputs-amoCRM"))
        } catch (e) {
          console.warn(e);
        }
        if (self.inputNames) {
          setWidget();
          self.inputs.forEach((input) => {
            if (input.val) {
              input.val.addEventListener("input", () => {
                self.inputs[2].val.value = +self.inputs[0].val.value + +self.inputs[1].val.value;
              })
            }
          });
        }
         true;
        },
      dpSettings() {
        return true;
      },
      advancedSettings() {
        renderSettings();
        return true;
      },
      destroy() {
      },
      onSave() {
      },
    };
    return this;
  };
  return CustomWidget;
});
