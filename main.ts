/* /**
* extended blocks for sozoRobot
*/

enum CarDirection {
    //% block="forward" enumval=0
    CarForward,
    //% block="back" enumval=1
    CarBackward,
    //% block="turn right" enumval=2
    CarTurnRight,
    //% block="turn left" enumval=3
    CarTurnLeft
}

//% weight=112 color=#00A654 icon="\uf1b9" block="ロボット"

namespace sozoRobot {
    let leftPinSet = AnalogPin.P1
    let rightPinSet = AnalogPin.P2
    let leftSpeedSet = 20
    let rightSpeedSet = 20

    /**
    * 車輪のIOピンを指定する
    * @param leftPin describe IO pin for left wheel, eg: AnalogPin.P1
    * @param rightPin describe IO pin for right wheel, eg: AnalogPin.P2
    */
    //% blockId=CCE_hamabit_wheel_pin
    //% block="左車輪のピン番号 %leftPin| 右車輪のピン番号 %rightPin"
    export function wheelPin(leftPin: AnalogPin, rightPin: AnalogPin): void {
        leftPinSet = leftPin
        rightPinSet = rightPin
    }

    /**
    * 車輪のスピードを指定する（0~100）
    * @param leftSpeed describe servo power from 0(min) to 100(max) here, eg: 15
    * @param rightSpeed describe servo power from 0(min) to 100(max) here, eg: 15
    */
    //% blockId=CCE_hamabit_wheel_speed
    //% block="左車輪のスピード %leftSpeed| 右車輪のスピード %rightSpeed"
    //% leftSpeed.min=0 leftSpeed.max=100
    //% rightSpeed.min=0 rightSpeed.max=100
    //% leftSpeed.defl=20
    //% rightSpeed.defl=20
    export function wheelSpeed(leftSpeed: number, rightSpeed: number): void {
        leftSpeedSet = leftSpeed
        rightSpeedSet = rightSpeed
    }

    /**
    * 前進－停止はストップブロックを使用
    */
    //% blockId=CCE_hamabit_servos_forward
    export function forward(powerCoefficient: number): void {
        let leftMoterPower = 9 * leftSpeedSet * (powerCoefficient / 100) + 1500
        let rightMoterPower = -9 * rightSpeedSet * (powerCoefficient / 100) + 1500
        if (leftMoterPower > 2400) {
            leftMoterPower = 2400
        }
        if (rightMoterPower < 600) {
            rightMoterPower = 600
        }
        pins.servoSetPulse(leftPinSet, leftMoterPower)
        pins.servoSetPulse(rightPinSet, rightMoterPower)
    }

    /**
    * バック－停止はストップブロックを使用
    */
    //% blockId=CCE_hamabit_servos_backward
    export function backward(powerCoefficient: number): void {
        let leftMoterPower = -9 * leftSpeedSet * (powerCoefficient / 100) + 1500
        let rightMoterPower = 9 * rightSpeedSet * (powerCoefficient / 100) + 1500
        if (leftMoterPower < 600) {
            leftMoterPower = 600
        }
        if (rightMoterPower > 2400) {
            rightMoterPower = 2400
        }
        pins.servoSetPulse(leftPinSet, leftMoterPower)
        pins.servoSetPulse(rightPinSet, rightMoterPower)
    }

    /**
    * 左回転－停止はストップブロックを使用
    */
    //% blockId=CCE_hamabit_servos_left
    export function left(powerCoefficient: number): void {
        let leftMoterPower = -9 * leftSpeedSet * (powerCoefficient / 100) + 1500
        let rightMoterPower = -9 * rightSpeedSet * (powerCoefficient / 100) + 1500
        if (leftMoterPower < 600) {
            leftMoterPower = 600
        }
        if (rightMoterPower < 600) {
            rightMoterPower = 600
        }
        pins.servoSetPulse(leftPinSet, leftMoterPower)
        pins.servoSetPulse(rightPinSet, rightMoterPower)
    }

    /**
    * 右回転－停止はストップブロックを使用
    */
    //% blockId=CCE_hamabit_servos_right
    export function right(powerCoefficient: number): void {
        let leftMoterPower = 9 * leftSpeedSet * (powerCoefficient / 100) + 1500
        let rightMoterPower = 9 * rightSpeedSet * (powerCoefficient / 100) + 1500
        if (leftMoterPower > 2400) {
            leftMoterPower = 2400
        }
        if (rightMoterPower > 2400) {
            rightMoterPower = 2400
        }
        pins.servoSetPulse(leftPinSet, leftMoterPower)
        pins.servoSetPulse(rightPinSet, rightMoterPower)
    }

    /**
    * 一定時間，前進したあとストップ
    * @param duration describe forwarding time in millisecond, eg:500
    */
    //% blockId=CCE_hamabit_drive_forwards
    //% block="前　進（ミリ秒） %duration"
    //% duration.shadow=timePicker
    //% duration.defl=1000
    export function driveForwards(duration: number): void {
        forward(100);
        basic.pause(duration);
        stop();
    }

    /**
    * 一定時間，バックしたあとストップ
    * @param duration describe backwarding time in millisecond, eg:500
    */
    //% blockID=CCE_hamabit_drive_backwards
    //% block="バック（ミリ秒） %duration"
    //% duration.shadow=timePicker
    //% duration.defl=1000
    export function driveBackwards(duration: number): void {
        backward(100);
        basic.pause(duration);
        stop();
    }

    /**
    * 一定時間，右回転したあとストップ
    * @param duration describe turning time in millisecond, eg:500
    */
    //% blockID=CCE_hamabit_drive_rightturns
    //% block="右回転（ミリ秒） %duration"
    //% duration.shadow=timePicker
    //% duration.defl=1000
    export function turnRight(duration: number): void {
        right(100);
        basic.pause(duration);
        stop();
    }

    /**
    * 一定時間，左回転したあとストップ
    * @param duration describe turning time in millisecond, eg:500
    */
    //% blockID=CCE_hamabit_drive_leftturns
    //% block="左回転（ミリ秒） %duration"
    //% duration.shadow=timePicker
    //% duration.defl=1000
    export function turnLeft(duration: number): void {
        left(100);
        basic.pause(duration);
        stop();
    }

    /**
     * 連続走行
     * @param describe directon to turn the car in, eg: CarDirection.CarForward
     */
    //% blockID=CCE_hamabit_drive_continuous
    //% block="連続走行 | %direction"
    // expandableArgumentMode="toggle"
    export function continuousRun(direction: CarDirection) {
        switch (direction) {
            case CarDirection.CarForward:
                forward(100);
                break
            case CarDirection.CarBackward:
                backward(100);
                break
            case CarDirection.CarTurnRight:
                right(100);
                break
            case CarDirection.CarTurnLeft:
                left(100);
                break
            default:
                stop();
        }
    }

    /**
    * ストップ
    */
    //% blockID=CCE_hamabit_drive_stop
    //% block="ストップ"
    export function stop(): void {
        pins.digitalWritePin(<number>leftPinSet, 0)
        pins.digitalWritePin(<number>rightPinSet, 0)
    }

    /**
    * 指定出力で一定時間，前進したあとストップ
    * @param duration in milliseconds to run the car, eg:500
    * @param powerAdjustment the factor of servo power adj　from 0 (min) to 200 (max), eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_forward
    //% block="前　進（ミリ秒） %duration| 出力（％） %powerAdjustment"
    //% duration.shadow=timePicker
    //% powerAdjustment.min=0 powerAdjustment.max=200
    //% duration.defl=1000
    //% powerAdjustment.defl=80
    export function customForwards(duration: number, powerAdjustment: number): void {
        forward(powerAdjustment);
        basic.pause(duration);
        stop();
    }

    /**
    * 指定出力で一定時間，バックしたあとストップ
    * @param duration in milliseconds to run the car, eg:500
    * @param powerAdjustment the factor of servo power adj　from 0 (min) to 200 (max), eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_backward
    //% block="バック（ミリ秒） %duration| 出力（％） %powerAdjustmen"
    //% duration.shadow=timePicker
    //% powerAdjustment.min=0 powerAdjustment.max=200
    //% duration.defl=1000
    //% powerAdjustment.defl=80
    export function customBackwards(duration: number, powerAdjustment: number): void {
        backward(powerAdjustment);
        basic.pause(duration);
        stop();
    }

    /**
    * 指定出力で一定時間，右回転したあとストップ
    * @param duration in milliseconds to run the car, eg:500
    * @param powerAdjustment the factor of servo power adj　from 0 (min) to 200 (max), eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_rightTurn
    //% block="右回転（ミリ秒） %duration| 出力（％） %powerAdjustment"
    //% duration.shadow=timePicker
    //% powerAdjustment.min=0 powerAdjustment.max=200
    //% duration.defl=1000
    //% powerAdjustment.defl=80
    export function customRight(duration: number, powerAdjustment: number): void {
        right(powerAdjustment);
        basic.pause(duration);
        stop();
    }

    /**
    * 指定出力で一定時間，左回転したあとストップ
    * @param duration in milliseconds to run the car, eg:500
    * @param powerAdjustment the factor of servo power adj　from 0 (min) to 200 (max), eg:80
    */
    //% advanced=true
    //% blockId=CCE_hamabit_custom_leftTurn
    //% block="左回転（ミリ秒） %duration| 出力（％） %powerAdjustment"
    //% duration.shadow=timePicker
    //% powerAdjustment.min=0 powerAdjustment.max=200
    //% duration.defl=1000
    //% powerAdjustment.defl=80
    export function customLeft(duration: number, powerAdjustment: number): void {
        left(powerAdjustment);
        basic.pause(duration);
        stop();
    }

}
